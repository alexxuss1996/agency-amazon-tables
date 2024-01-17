import { Profile } from "../types";
import { DataTable } from "../components/DataTable";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";

interface ProfilePageProps {
  data: Profile[];
  setSelectedProfileId: (value: React.SetStateAction<number | null>) => void;
}

const currentColumns = ["profileId", "country", "marketplace"];

export const ProfilePage = ({
  data,
  setSelectedProfileId,
}: ProfilePageProps) => {
  const navigate = useNavigate();

  const handleProfileClick = (profileId: number) => {
    setSelectedProfileId(profileId);
    navigate(`/campaigns/${profileId}`);
  };
  return (
    <Container>
      <Row>
        <h2>Profiles</h2>
        <Button className="mb-3" onClick={() => navigate(-1)}>
          Go To Accounts
        </Button>
        <DataTable
          data={data}
          columns={currentColumns}
          onRowClick={handleProfileClick}
        />
      </Row>
    </Container>
  );
};
