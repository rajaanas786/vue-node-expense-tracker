<template>
    <div class="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mb-6">
      <h2 class="text-xl font-bold mb-4">➕ Add New Expense</h2>
  
      <form @submit.prevent="submitExpense" class="space-y-4">
        <div>
          <label class="block mb-1">Title</label>
          <input v-model="expense.title" type="text" class="w-full border px-4 py-2 rounded" required />
        </div>
  
        <div>
          <label class="block mb-1">Amount ($)</label>
          <input v-model.number="expense.amount" type="number" step="0.01" class="w-full border px-4 py-2 rounded" required />
        </div>
  
        <div>
          <label class="block mb-1">Category</label>
          <input v-model="expense.category" type="text" class="w-full border px-4 py-2 rounded" required />
        </div>
  
        <div>
          <label class="block mb-1">Date</label>
          <input v-model="expense.date" type="date" class="w-full border px-4 py-2 rounded" required />
        </div>
  
        <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Add Expense
        </button>
      </form>
  
      <p v-if="message" class="text-green-600 mt-4 font-semibold">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AddExpenseForm',
    data() {
      return {
        expense: {
          title: '',
          amount: '',
          category: '',
          date: ''
        },
        message: ''
      };
    },
    methods: {
      async submitExpense() {
        try {
          const res = await axios.post('http://localhost:5000/api/expenses', this.expense);
          this.message = '✅ Expense added successfully!';
          // Reset form
          this.expense = {
            title: '',
            amount: '',
            category: '',
            date: ''
          };
          this.$emit('expense-added'); // optional for refreshing list
        } catch (err) {
          console.error('Error adding expense:', err.message);
          this.message = 'Failed to add expense.';
        }
      }
    }
  };
  </script>
  