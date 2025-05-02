<template>
    <div class="p-6 max-w-5xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">🧾 All Expenses</h1>
  
      <table v-if="expenses.length > 0" class="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead class="bg-gray-100 text-left">
          <tr>
            <th class="py-2 px-4 border-b">#</th>
            <th class="py-2 px-4 border-b">Title</th>
            <th class="py-2 px-4 border-b">Category</th>
            <th class="py-2 px-4 border-b">Amount ($)</th>
            <th class="py-2 px-4 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(expense, index) in expenses" :key="expense.id" class="hover:bg-gray-50">
            <td class="py-2 px-4 border-b">{{ index + 1 }}</td>
            <td class="py-2 px-4 border-b">{{ expense.title }}</td>
            <td class="py-2 px-4 border-b">{{ expense.category }}</td>
            <td class="py-2 px-4 border-b text-green-600 font-semibold">${{ expense.amount }}</td>
            <td class="py-2 px-4 border-b">{{ expense.date }}</td>
          </tr>
        </tbody>
      </table>
  
      <div v-else class="text-gray-600">No expenses found.</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ExpensesList',
    data() {
      return {
        expenses: []
      };
    },
    mounted() {
      this.fetchExpenses();
    },
    methods: {
      async fetchExpenses() {
        try {
          const res = await axios.get('http://localhost:5000/api/expenses');
          this.expenses = res.data.data;
        } catch (err) {
          console.error('Error fetching expenses:', err.message);
        }
      }
    }
  };
  </script>
  