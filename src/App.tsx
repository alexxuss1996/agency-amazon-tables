import React, { useEffect } from "react";
import { Campaign, Account, Profile } from "./types";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AccountPage } from "./pages/AccountPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CampaignPage } from "./pages/CampaignPage";

export const App = () => {
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = React.useState<
    number | null
  >(null);
  const [selectedProfileId, setSelectedProfileId] = React.useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/accounts");
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const getSelectedAccountProfiles = (): Profile[] => {
    const selectedAccount = accounts?.find(
      (acc) => acc.accountId === selectedAccountId
    );
    return selectedAccount?.profiles || [];
  };

  const getSelectedProfileCampaigns = (): Campaign[] => {
    const selectedProfile = accounts
      ?.flatMap((acc) => acc.profiles)
      .find((prof) => prof.profileId === selectedProfileId);
    return selectedProfile?.campaigns || [];
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AccountPage
              data={accounts}
              setSelectedAccountId={setSelectedAccountId}
              setSelectedProfileId={setSelectedProfileId}
            />
          }
        />
        <Route
          path="profiles/:profileId"
          element={
            <ProfilePage
              data={getSelectedAccountProfiles()}
              setSelectedProfileId={setSelectedProfileId}
            />
          }
        />
        <Route
          path="campaigns/:campaignId"
          element={<CampaignPage data={getSelectedProfileCampaigns()} />}
        />
      </Routes>
    </BrowserRouter>
  );
};
