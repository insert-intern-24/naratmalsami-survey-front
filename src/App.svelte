<script>
  import Router from 'svelte-spa-router';
  import Index from './routes/Index.svelte';
  import Survey from './routes/Survey.svelte';

  const routes = {
    '/': Index,
    '/survey': Survey,
  };
</script>


<Router {routes} />