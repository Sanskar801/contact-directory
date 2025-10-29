import { QueryClientProvider } from "@tanstack/react-query";
import { Container } from "lucide-react";
import ContactList from "./components/contacts/ContactList";
import Header from "./components/layout/Header";
import { useToast } from "./hooks/useToast";
import { queryClient } from "./utils/queryClient";
import { ToastContainer } from "./components/ui/Toast";


export default function App() {
  const { toasts, removeToast } = useToast();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Container>
          <ContactList />
        </Container>

        {/* Toast Notifications */}
        <ToastContainer toasts={toasts} onRemove={removeToast} />

      </div>
    </QueryClientProvider>
  );
}
