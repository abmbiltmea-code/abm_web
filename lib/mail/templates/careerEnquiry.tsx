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

export type CareerEnquiryEmailProps = {
  firstName: string;
  secondName: string;
  phoneNumber: string;
  email: string;
  currentLocation: string;
  message?: string;
};

export function CareerEnquiryEmail({
  firstName,
  secondName,
  phoneNumber,
  email,
  currentLocation,
  message,
}: CareerEnquiryEmailProps): ReactElement {
  return (
    <Html>
      <Head />
      <Preview>New job application from {firstName} {secondName}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.headerLabel}>NEW APPLICATION</Text>
            <Text style={styles.headerTitle}>Someone applied for a role</Text>
          </Section>

          <Section style={styles.content}>
            <Field label="Name" value={`${firstName} ${secondName}`} />
            <Field label="Phone" value={phoneNumber} />
            <Field label="Email" value={email} />
            <Field label="Current Location" value={currentLocation} />
            {message && <Field label="Message" value={message} last />}
          </Section>

          <Hr style={styles.hr} />

          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              CV is attached to this email. © {new Date().getFullYear()} ABM. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function Field({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <Row style={{ marginBottom: last ? 0 : 20 }}>
      <Column>
        <Text style={styles.fieldLabel}>{label}</Text>
        <Text style={styles.fieldValue}>{value}</Text>
      </Column>
    </Row>
  );
}

const styles = {
  body: { backgroundColor: "#F9F9F9", margin: 0, padding: "40px 0", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" },
  container: { backgroundColor: "#ffffff", maxWidth: "560px", margin: "0 auto", borderRadius: "12px", overflow: "hidden" as const, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" },
  header: { backgroundColor: "#333333", padding: "36px 40px" },
  headerLabel: { color: "#E31E26", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" as const, fontWeight: "700", margin: "0 0 8px" },
  headerTitle: { color: "#ffffff", fontSize: "22px", fontWeight: "600", margin: 0 },
  content: { padding: "36px 40px" },
  fieldLabel: { color: "#7c7c7c", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase" as const, margin: "0 0 4px" },
  fieldValue: { color: "#333333", fontSize: "15px", margin: 0 },
  hr: { borderColor: "#CCCCCC", margin: "0 40px" },
  footer: { padding: "24px 40px" },
  footerText: { color: "#7c7c7c", fontSize: "12px", margin: 0, textAlign: "center" as const },
};