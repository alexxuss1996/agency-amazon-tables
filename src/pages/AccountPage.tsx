import { Account } from "../types";
import { DataTable } from "../components/DataTable";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

interface AccountPageProps {
  data: Account[];
  setSelectedAccountId: (value: React.SetStateAction<number | null>) => void;
  setSelectedProfileId: (value: React.SetStateAction<number | null>) => void;
}

const currentColumns = ["accountId", "email", "authToken", "creationDate"];

export const AccountPage = ({
  data,
  setSelectedAccountId,
  setSelectedProfileId,
}: AccountPageProps) => {
  const navigate = useNavigate();
  const handleAccountClick = (accountId: number) => {
    setSelectedAccountId(accountId);

    setSelectedProfileId(null);
    navigate(`/profiles/${accountId}`);
  };
  return (
    <Container>
      <Row>
        <h2>Accounts</h2>
        <DataTable
          data={data}
          columns={currentColumns}
          onRowClick={handleAccountClick}
        />
      </Row>
    </Container>
  );
};
