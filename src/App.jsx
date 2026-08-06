import React from 'react';
import { AppProvider } from './context/AppContext';
import Dashboard from './components/Dashboard';

// Filet de sécurité : si un bug survient malgré les tests, l'utilisateur voit
// un message explicite plutôt qu'un écran blanc silencieux et indébogable.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Erreur applicative interceptée :', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow p-6 text-center">
            <h1 className="text-lg font-bold text-red-600 mb-2">
              Une erreur est survenue
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              L'application a rencontré un problème inattendu. Vos données restent
              enregistrées dans ce navigateur.
            </p>
            <pre className="text-xs text-left bg-gray-100 rounded p-3 overflow-auto mb-4 text-gray-700">
              {String(this.state.error.message || this.state.error)}
            </pre>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Recharger la page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Dashboard />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
