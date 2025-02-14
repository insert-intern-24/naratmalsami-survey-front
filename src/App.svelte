<script>
  import Router from 'svelte-spa-router';
  import Index from './routes/Index.svelte';
  import Survey from './routes/Survey.svelte';
  import Result from './routes/Result.svelte';

  const routes = {
    '/': Index,
    '/survey': Survey,
    '/result': Result
  };
</script>


<Router {routes} />