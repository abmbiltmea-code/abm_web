import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Hr,
  Section,
  Row,
  Column,
} from "@react-email/components";
import { ReactElement } from "react";

// Props match the form fields exactly (no mismatched names)
export type ContactEnquiryEmailProps = {
  firstName: string;
  secondName: string;
  email: string;
  contactNo: string;
  message: string;
};

export function ContactEnquiryEmail({
  firstName,
  secondName,
  email,
  contactNo,
  message,
}: ContactEnquiryEmailProps): ReactElement {
  return (
    <Html>
      <Head />
      <Preview>New contact enquiry from {firstName} {secondName}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.header}>
            <Text style={styles.headerLabel}>NEW CONTACT ENQUIRY</Text>
            <Text style={styles.headerTitle}>Someone wants to connect</Text>
          </Section>

          {/* Fields */}
          <Section style={styles.content}>
            <Field label="Name" value={`${firstName} ${secondName}`} />
            <Field label="Email" value={email} />
            <Field label="Contact No" value={contactNo} />
            <Field label="Message" value={message} last />
          </Section>

          <Hr style={styles.hr} />

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              © {new Date().getFullYear()} ABM. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function Field({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <Row style={{ marginBottom: last ? 0 : 20 }}>
      <Column>
        <Text style={styles.fieldLabel}>{label}</Text>
        <Text style={styles.fieldValue}>{value}</Text>
      </Column>
    </Row>
  );
}

// Brand colors used consistently across email templates
const styles = {
  body: {
    backgroundColor: "#F9F9F9", // cream-background
    margin: 0,
    padding: "40px 0",
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff", // background
    maxWidth: "560px",
    margin: "0 auto",
    borderRadius: "12px",
    overflow: "hidden" as const,
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  },
  header: {
    backgroundColor: "#333333", // secondary
    padding: "36px 40px",
  },
  headerLabel: {
    color: "#E31E26", // primary
    fontSize: "11px",
    letterSpacing: "2px",
    textTransform: "uppercase" as const,
    fontWeight: "700",
    margin: "0 0 8px",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: "600",
    margin: 0,
  },
  content: {
    padding: "36px 40px",
  },
  fieldLabel: {
    color: "#7c7c7c", // description-color
    fontSize: "11px",
    letterSpacing: "1.5px",
    textTransform: "uppercase" as const,
    margin: "0 0 4px",
  },
  fieldValue: {
    color: "#333333", // secondary
    fontSize: "15px",
    margin: 0,
  },
  hr: {
    borderColor: "#CCCCCC", // border-color
    margin: "0 40px",
  },
  footer: {
    padding: "24px 40px",
  },
  footerText: {
    color: "#7c7c7c", // description-color
    fontSize: "12px",
    margin: 0,
    textAlign: "center" as const,
  },
};