<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">🧾 Expense Tracker</h1>

    <!-- Filters -->
    <div class="flex flex-wrap gap-4 items-end mb-6">
      <!-- Category Filter -->
      <div>
        <label class="block text-sm font-medium">Category:</label>
        <select v-model="selectedCategory" class="border px-3 py-1 rounded">
          <option value="">All</option>
          <option v-for="category in uniqueCategories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <!-- From Date -->
      <div>
        <label class="block text-sm font-medium">From:</label>
        <input v-model="startDate" type="date" class="border px-3 py-1 rounded" />
      </div>

      <!-- To Date -->
      <div>
        <label class="block text-sm font-medium">To:</label>
        <input v-model="endDate" type="date" class="border px-3 py-1 rounded" />
      </div>
    </div>

    <!-- Table -->
    <table v-if="filteredExpenses.length > 0" class="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
      <thead class="bg-gray-100 text-left">
        <tr>
          <th class="py-2 px-4 border-b">#</th>
          <th class="py-2 px-4 border-b">Title</th>
          <th class="py-2 px-4 border-b">Category</th>
          <th class="py-2 px-4 border-b">Amount ($)</th>
          <th class="py-2 px-4 border-b">Date</th>
          <th class="py-2 px-4 border-b text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(expense, index) in filteredExpenses" :key="expense.id" class="hover:bg-gray-50">
          <td class="py-2 px-4 border-b">{{ index + 1 }}</td>
          <td class="py-2 px-4 border-b">{{ expense.title }}</td>
          <td class="py-2 px-4 border-b">{{ expense.category }}</td>
          <td class="py-2 px-4 border-b text-green-600 font-semibold">${{ expense.amount }}</td>
          <td class="py-2 px-4 border-b">{{ expense.date }}</td>
          <td class="py-2 px-4 border-b text-right">
            <button
              @click="confirmDelete(expense.id)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="text-gray-600 mt-6">No expenses found for selected filters.</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ExpensesList',
  data() {
    return {
      expenses: [],
      selectedCategory: '',
      startDate: '',
      endDate: ''
    };
  },
  computed: {
    uniqueCategories() {
      const categories = this.expenses.map(e => e.category);
      return [...new Set(categories)];
    },
    filteredExpenses() {
      let list = this.expenses;

      if (this.selectedCategory) {
        list = list.filter(e => e.category === this.selectedCategory);
      }

      if (this.startDate) {
        list = list.filter(e => e.date >= this.startDate);
      }

      if (this.endDate) {
        list = list.filter(e => e.date <= this.endDate);
      }

      return list;
    }
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
    },
    async confirmDelete(id) {
      const confirmDelete = confirm('Are you sure you want to delete this expense?');
      if (!confirmDelete) return;

      try {
        await axios.delete(`http://localhost:5000/api/expenses/${id}`);
        this.fetchExpenses(); // refresh list after soft delete
      } catch (err) {
        console.error('Error deleting expense:', err.message);
      }
    }
  }
};
</script>

<style scoped>
/* optional custom styles here */
</style>
