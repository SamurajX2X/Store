<template>
<form @submit="onSubmit">      
      <input v-model="name" />
      <select v-model="category" />
      <select v-model="sort" />
      <select v-model="dir" />
      <button type="submit">Search</button>  
</form>
</template>


<script>
</script>

<style scoped>

</style>