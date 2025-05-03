<template>
  <div class="bg-gray-50 min-h-screen">
    <AddExpenseForm />
    <ExpensesList />
  </div>
</template>

<script>
import AddExpenseForm from './components/AddExpenseForm.vue';
import ExpensesList from './components/ExpensesList.vue';

export default {
  components: {
    AddExpenseForm,
    ExpensesList
  }
};
</script>
