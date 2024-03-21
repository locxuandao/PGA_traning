import { QueryClient, QueryClientProvider } from "react-query";
import RootLayout from "app/layout/rootLayout";
import { Helmet } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

import GolobalStyles from "styles/GlobalStyles";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/">
        <Helmet defaultTitle="Template App">
          <meta name="description" content="Template App" />
        </Helmet>

        <StyledEngineProvider injectFirst>
          <GolobalStyles>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              autoHideDuration={2000}
            >
              <RootLayout />
            </SnackbarProvider>
          </GolobalStyles>
        </StyledEngineProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
