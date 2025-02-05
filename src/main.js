import { mount } from 'svelte'
import App from './App.svelte'
import './styles/_base.scss';

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
