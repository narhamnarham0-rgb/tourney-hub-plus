import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardPage from "@/pages/DashboardPage";
import OrganizationsPage from "@/pages/OrganizationsPage";
import TournamentsPage from "@/pages/TournamentsPage";
import TournamentDetailPage from "@/pages/TournamentDetailPage";
import TeamsPage from "@/pages/TeamsPage";
import PlayersPage from "@/pages/PlayersPage";
import MatchesPage from "@/pages/MatchesPage";
import MatchCenterPage from "@/pages/MatchCenterPage";
import VenuesPage from "@/pages/VenuesPage";
import RefereesPage from "@/pages/RefereesPage";
import StandingsPage from "@/pages/StandingsPage";
import StatisticsPage from "@/pages/StatisticsPage";
import ReportsPage from "@/pages/ReportsPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
          <Route path="/organizations" element={<DashboardLayout><OrganizationsPage /></DashboardLayout>} />
          <Route path="/tournaments" element={<DashboardLayout><TournamentsPage /></DashboardLayout>} />
          <Route path="/tournaments/detail" element={<DashboardLayout><TournamentDetailPage /></DashboardLayout>} />
          <Route path="/teams" element={<DashboardLayout><TeamsPage /></DashboardLayout>} />
          <Route path="/players" element={<DashboardLayout><PlayersPage /></DashboardLayout>} />
          <Route path="/matches" element={<DashboardLayout><MatchesPage /></DashboardLayout>} />
          <Route path="/matches/center" element={<DashboardLayout><MatchCenterPage /></DashboardLayout>} />
          <Route path="/venues" element={<DashboardLayout><VenuesPage /></DashboardLayout>} />
          <Route path="/referees" element={<DashboardLayout><RefereesPage /></DashboardLayout>} />
          <Route path="/standings" element={<DashboardLayout><StandingsPage /></DashboardLayout>} />
          <Route path="/statistics" element={<DashboardLayout><StatisticsPage /></DashboardLayout>} />
          <Route path="/reports" element={<DashboardLayout><ReportsPage /></DashboardLayout>} />
          <Route path="/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
