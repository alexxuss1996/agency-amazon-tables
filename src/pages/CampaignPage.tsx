import { Campaign } from "../types";
import { DataTable } from "../components/DataTable";
import { Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
interface CampaignPageProps {
  data: Campaign[];
  onRowClick?: (id: number) => void;
}

const currentColumns = ["campaignId", "clicks", "cost", "date"];

export const CampaignPage = ({ data, onRowClick }: CampaignPageProps) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        <h2>Campaigns</h2>
        <Button className="mb-3 btn-success" onClick={() => navigate("/")}>
          Go to Accounts
        </Button>
        <Button className="mb-3" onClick={() => navigate(-1)}>
          Go To Profiles
        </Button>
        <DataTable
          data={data}
          columns={currentColumns}
          onRowClick={onRowClick}
        />
      </Row>
    </Container>
  );
};
