import { Component, OnInit } from '@angular/core';
import { ImportCsvService } from './import-csv.service';
import { CategoryConst } from '../shared/category-const';
import { MainService } from '../main/main.service';

@Component({
  selector: 'app-import-csv',
  templateUrl: './import-csv.component.html',
  styleUrls: ['./import-csv.component.scss']
})
export class ImportCsvComponent implements OnInit {

  transactions: any[] = [];
  fileName = '';
  isLoading = false;
  isParsed = false;
  isSaving = false;
  isSaved = false;

  message = '';
  messageType = 'success';

  // Result summary
  savedExpenses = 0;
  savedIncomes = 0;
  duplicatesSkipped = 0;
  duplicates: any[] = [];

  expenseCategories = CategoryConst.LIST;
  incomeCategories = [
    'Person 1 Salary',
    'Person 2 Salary',
    'Person 1 Extra',
    'Person 2 Extra'
  ];

  constructor(
    private importCsvService: ImportCsvService,
    private mainService: MainService
  ) { }

  ngOnInit(): void { }

  /**
   * Handle file selection
   */
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.isLoading = true;
      this.isParsed = false;
      this.isSaved = false;
      this.message = '';
      this.transactions = [];

      this.importCsvService.uploadCsv(file).subscribe(
        (res) => {
          this.transactions = res.data.map((row: any, index: number) => ({
            ...row,
            id: index,
            selected: true,
            category: ''
          }));
          this.isParsed = true;
          this.isLoading = false;
        },
        (err) => {
          this.message = 'Error parsing CSV file. Please check the file format.';
          this.messageType = 'danger';
          this.isLoading = false;
        }
      );
    }
  }

  /**
   * Get categories based on transaction type
   */
  getCategories(type: string): string[] {
    return type === 'income' ? this.incomeCategories : this.expenseCategories;
  }

  /**
   * Toggle select all
   */
  toggleSelectAll(event: any): void {
    const checked = event.target.checked;
    this.transactions.forEach(t => t.selected = checked);
  }

  /**
   * Check if all are selected
   */
  get allSelected(): boolean {
    return this.transactions.length > 0 && this.transactions.every(t => t.selected);
  }

  /**
   * Get selected transactions count
   */
  get selectedCount(): number {
    return this.transactions.filter(t => t.selected).length;
  }

  /**
   * Get selected incomes count
   */
  get selectedIncomeCount(): number {
    return this.transactions.filter(t => t.selected && t.type === 'income').length;
  }

  /**
   * Get selected expenses count
   */
  get selectedExpenseCount(): number {
    return this.transactions.filter(t => t.selected && t.type === 'expense').length;
  }

  /**
   * Check if all selected transactions have categories
   */
  get allCategorized(): boolean {
    return this.transactions
      .filter(t => t.selected)
      .every(t => t.category && t.category !== '');
  }

  /**
   * Check if ready to import
   */
  get canImport(): boolean {
    return this.selectedCount > 0 && this.allCategorized && !this.isSaving;
  }

  /**
   * Format value as currency
   */
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(value);
  }

  /**
   * Import selected transactions
   */
  importTransactions(): void {
    const selected = this.transactions
      .filter(t => t.selected)
      .map(t => ({
        date: t.date,
        description: t.description,
        category: t.category,
        value: t.amount,
        type: t.type,
        credit: ['Visa', 'Mastercard', 'Amex', 'Master', 'Card'].includes(t.accountType)
      }));

    if (selected.length === 0) {
      this.message = 'No transactions selected.';
      this.messageType = 'warning';
      return;
    }

    this.isSaving = true;
    this.message = '';

    this.importCsvService.saveTransactions(selected).subscribe(
      (res) => {
        this.savedExpenses = res.savedExpenses;
        this.savedIncomes = res.savedIncomes;
        this.duplicatesSkipped = res.duplicatesSkipped;
        this.duplicates = res.duplicates || [];
        this.isSaving = false;
        this.isSaved = true;
        this.messageType = 'success';
        this.message = res.message;

        // Refresh dashboard data
        if (this.transactions.length > 0) {
          const firstDate = this.transactions.find(t => t.selected);
          if (firstDate) {
            this.mainService.update(new Date(`${firstDate.date}T12:00:00.000Z`));
          }
        }
      },
      (err) => {
        this.message = 'Error importing transactions. Please try again.';
        this.messageType = 'danger';
        this.isSaving = false;
      }
    );
  }

  /**
   * Reset to upload a new file
   */
  reset(): void {
    this.transactions = [];
    this.fileName = '';
    this.isParsed = false;
    this.isSaved = false;
    this.isSaving = false;
    this.isLoading = false;
    this.message = '';
    this.savedExpenses = 0;
    this.savedIncomes = 0;
    this.duplicatesSkipped = 0;
    this.duplicates = [];
  }
}
