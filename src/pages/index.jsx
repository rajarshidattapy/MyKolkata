import Login from './login'

// Declared as a real component rather than `export { default } from './login'`.
// A bare re-export gives Fast Refresh no local component binding to track, so
// every edit fell back to a full page reload.
export default function Index() {
  return <Login />
}
