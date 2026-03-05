import { Avatar, Tag } from "primitives";
import { Flex } from "layout";
import "./AccessReviewCard.css";

// Note: Logo images sourced from Figma MCP assets (valid for 7 days from March 5, 2026)
const notionLogo =
  "http://localhost:3845/assets/4fddc33f181888a878450987b9957b188aa3a610.png";
const onePasswordLogo =
  "http://localhost:3845/assets/dae22c62a092373dbcc4fe73c5a327929ad124c1.png";
const zoominfoLogo =
  "http://localhost:3845/assets/402516f1346b0071e025166ab222f173fef27b9d.png";

type ReviewRow = {
  id: number;
  system: string;
  logo: string;
  logoRounded: boolean;
  status: string;
  assignee: string;
  assigneeInitial: string;
};

const rows: ReviewRow[] = [
  {
    id: 1,
    system: "Notion",
    logo: notionLogo,
    logoRounded: true,
    status: "Pending",
    assignee: "Alina Zhang",
    assigneeInitial: "A",
  },
  {
    id: 2,
    system: "1Password",
    logo: onePasswordLogo,
    logoRounded: false,
    status: "Pending",
    assignee: "Alina Zhang",
    assigneeInitial: "A",
  },
  {
    id: 3,
    system: "Zoominfo",
    logo: zoominfoLogo,
    logoRounded: true,
    status: "Pending",
    assignee: "Alina Zhang",
    assigneeInitial: "A",
  },
];

export function AccessReviewCard() {
  return (
    <div className="arc-frame">
      <div className="arc-card">
        {/* Header */}
        <div className="arc-header-row">
          <div className="arc-col-system">
            <span className="arc-col-label">System</span>
          </div>
          <div className="arc-col-status">
            <span className="arc-col-label">Status</span>
          </div>
          <div className="arc-col-action">
            <span className="arc-col-label">Action needed by</span>
          </div>
        </div>

        <div className="arc-divider" />

        {/* Data rows */}
        {rows.map((row, index) => (
          <div key={row.id}>
            <div className="arc-data-row">
              {/* System */}
              <div className="arc-col-system">
                <Flex direction="row" gap="200" alignSecondary="center">
                  <img
                    src={row.logo}
                    alt={row.system}
                    className={`arc-logo${row.logoRounded ? " arc-logo-rounded" : ""}`}
                  />
                  <span className="arc-system-name">{row.system}</span>
                </Flex>
              </div>

              {/* Status */}
              <div className="arc-col-status">
                <Tag scheme="neutral" variant="primary">
                  {row.status}
                </Tag>
              </div>

              {/* Action needed by */}
              <div className="arc-col-action">
                <Flex direction="row" gap="200" alignSecondary="center">
                  <Avatar initials={row.assigneeInitial} size="small" />
                  <span className="arc-assignee-name">{row.assignee}</span>
                </Flex>
              </div>
            </div>

            {index < rows.length - 1 && <div className="arc-divider" />}
          </div>
        ))}
      </div>
    </div>
  );
}
