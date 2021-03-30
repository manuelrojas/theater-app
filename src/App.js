import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { QueryClient, QueryClientProvider } from 'react-query'
import Search from './component/search';

const theme = createMuiTheme( {
    palette: {
    type: 'dark',
  }
});

function App() {
  const queryClient = new QueryClient();
  return (
    <MuiThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Search />
        </div>
      </QueryClientProvider>
    </MuiThemeProvider>
  );
}

export default App;
