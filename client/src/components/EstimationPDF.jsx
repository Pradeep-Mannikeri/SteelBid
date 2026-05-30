import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  Svg,
  Path,
} from "@react-pdf/renderer";
import logo from "../assets/images/logo1.png";

// Define a clean styling system using standard Helvetica fonts
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#334155",
    backgroundColor: "#ffffff",
  },
  // Header Section
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1.5,
    borderBottomColor: "#0f172a",
    paddingBottom: 8,
    marginBottom: 10,
  },
  branding: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  companyInfo: {
    flexDirection: "column",
  },
  companyName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0f172a",
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 5.5,
    color: "#0284c7",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  contactText: {
    fontSize: 7,
    color: "#64748b",
    lineHeight: 1.25,
  },
  titleContainer: {
    alignItems: "flex-end",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0284c7",
    letterSpacing: 1.2,
  },
  titleBar: {
    width: 50,
    height: 2.5,
    backgroundColor: "#0284c7",
    marginTop: 3,
  },
  // Metadata Card
  metaCard: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  metaCell: {
    width: "48%",
  },
  metaLabel: {
    fontSize: 6.5,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#64748b",
    marginBottom: 1,
    letterSpacing: 0.3,
  },
  metaValue: {
    fontSize: 8.5,
    color: "#0f172a",
    fontWeight: "bold",
  },
  metaValueHighlight: {
    fontSize: 8.5,
    color: "#0284c7",
    fontWeight: "bold",
  },
  // Columns Container
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  leftColumn: {
    width: "48%",
  },
  rightColumn: {
    width: "48%",
  },
  // Client Card
  clientCard: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  cardHeader: {
    fontSize: 7.5,
    fontWeight: "bold",
    color: "#0f172a",
    borderBottomWidth: 1,
    borderBottomColor: "#0284c7",
    paddingBottom: 3,
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardField: {
    marginBottom: 4,
  },
  fieldLabel: {
    fontSize: 6.5,
    color: "#64748b",
    textTransform: "uppercase",
    marginBottom: 1,
    letterSpacing: 0.2,
  },
  fieldValue: {
    fontSize: 8,
    color: "#334155",
    fontWeight: "bold",
  },
  // Checklist Section
  checklistSection: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  // Checkbox Grid Styles
  checkboxGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 2,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
    width: "50%",
  },
  checkbox: {
    width: 9,
    height: 9,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 1.5,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#0284c7",
    borderColor: "#0284c7",
  },
  checkmark: {
    width: 5,
    height: 5,
  },
  checkboxLabel: {
    fontSize: 7.5,
    color: "#334155",
  },
  // Scope of Work Card
  scopeCard: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 6,
    backgroundColor: "#ffffff",
    padding: 8,
    marginBottom: 10,
    minHeight: 60,
  },
  scopeHeader: {
    fontSize: 7.5,
    fontWeight: "bold",
    color: "#0f172a",
    borderBottomWidth: 1,
    borderBottomColor: "#0284c7",
    paddingBottom: 3,
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  scopeText: {
    fontSize: 7.5,
    color: "#334155",
    lineHeight: 1.35,
  },
  scopeTextPlaceholder: {
    fontSize: 7.5,
    color: "#94a3b8",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
  },
  // Pricing Banner
  pricingBanner: {
    flexDirection: "row",
    backgroundColor: "#1e293b",
    borderRadius: 6,
    padding: 8,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  priceContainer: {
    width: "48%",
  },
  scheduleContainer: {
    width: "48%",
    alignItems: "flex-end",
  },
  pricingLabel: {
    fontSize: 6.5,
    color: "#94a3b8",
    textTransform: "uppercase",
    marginBottom: 1,
    letterSpacing: 0.3,
  },
  priceValue: {
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "bold",
  },
  scheduleValue: {
    fontSize: 9.5,
    color: "#0284c7",
    fontWeight: "bold",
  },
  // Notes Card
  notesCard: {
    borderLeftWidth: 2.5,
    borderLeftColor: "#eab308",
    backgroundColor: "#fef8e6",
    padding: 6,
    borderRadius: 3,
    marginBottom: 12,
  },
  notesTitle: {
    fontSize: 7,
    fontWeight: "bold",
    color: "#854d0e",
    marginBottom: 1,
  },
  notesText: {
    fontSize: 7,
    color: "#854d0e",
    lineHeight: 1.25,
  },
  // Footer / Signatures
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  signatureBlock: {
    width: "48%",
  },
  sigLabel: {
    fontSize: 7.5,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 4,
  },
  sigLogo: {
    width: 32,
    height: 32,
    opacity: 0.8,
    marginBottom: 1,
  },
  sigLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#0f172a",
    width: "100%",
    marginTop: 4,
    marginBottom: 4,
  },
  sigFinePrint: {
    fontSize: 6.5,
    color: "#64748b",
    fontStyle: "italic",
  },
  sealBlock: {
    width: "48%",
  },
  sealBox: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderStyle: "dashed",
    borderRadius: 6,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  sealPlaceholder: {
    fontSize: 7,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  // Page 2: Annexure Styles
  annexSection: {
    marginBottom: 12,
  },
  annexHeader: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#0284c7",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  annexText: {
    fontSize: 8,
    color: "#334155",
    lineHeight: 1.35,
    paddingLeft: 4,
  },
});

// Custom Checkbox Component for PDF
const Checkbox = ({ checked, label }) => (
  <View style={styles.checkboxContainer}>
    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
      {checked && (
        <Svg viewBox="0 0 10 10" style={styles.checkmark}>
          <Path
            d="M2 5 L4 7 L8 2"
            fill="none"
            stroke="#ffffff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      )}
    </View>
    <Text style={styles.checkboxLabel}>{label}</Text>
  </View>
);

const EstimationPDF = ({ data }) => {
  const {
    id = "N/A",
    companyName = "N/A",
    location = "N/A",
    project = "N/A",
    date = "N/A",
    price = 0,
    remarks = "",
    inclusions = "",
    exclusions = "",
    scopeOfWork = "",
    scopeSubmittals = [],
    drawingRequirements = [],
    sendingBys = [],
    projectManager = "N/A",
    contactDetails = "N/A",
  } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.branding}>
            <Image src={logo} style={styles.logo} />
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>STEEL DIMENSION LLC</Text>
              <Text style={styles.tagline}>Precision in Every Detail, Strength in Every Structure...!</Text>
              <Text style={styles.contactText}>www.SteelDimension.com  |  Estimation@SteelDimension.com  |  +1 727-378-1270</Text>
            </View>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>LETTER OF QUOTATION</Text>
            <View style={styles.titleBar} />
          </View>
        </View>

        {/* Meta Info Grid */}
        <View style={styles.metaCard}>
          <View style={styles.metaRow}>
            <View style={styles.metaCell}>
              <Text style={styles.metaLabel}>Quotation Number</Text>
              <Text style={styles.metaValueHighlight}>{id}</Text>
            </View>
            <View style={styles.metaCell}>
              <Text style={styles.metaLabel}>Received Date</Text>
              <Text style={styles.metaValue}>{data.receivedDate || "N/A"}</Text>
            </View>
          </View>
          <View style={styles.metaRow}>
            <View style={styles.metaCell}>
              <Text style={styles.metaLabel}>Job Name</Text>
              <Text style={styles.metaValue}>{project}</Text>
            </View>
            <View style={styles.metaCell}>
              <Text style={styles.metaLabel}>Bid Date</Text>
              <Text style={styles.metaValue}>{data.bidDate || "N/A"}</Text>
            </View>
          </View>
        </View>

        {/* Main Columns Grid */}
        <View style={styles.columnsContainer}>
          {/* Left Column: Client Details & Sending Options */}
          <View style={styles.leftColumn}>
            {/* Client Card */}
            <View style={styles.clientCard}>
              <Text style={styles.cardHeader}>CLIENT DETAILS</Text>
              <View style={styles.cardField}>
                <Text style={styles.fieldLabel}>Client Name</Text>
                <Text style={styles.fieldValue}>{companyName}</Text>
              </View>
              <View style={styles.cardField}>
                <Text style={styles.fieldLabel}>Address</Text>
                <Text style={styles.fieldValue}>{location}</Text>
              </View>
              <View style={styles.cardField}>
                <Text style={styles.fieldLabel}>Project Manager</Text>
                <Text style={styles.fieldValue}>{projectManager}</Text>
              </View>
              <View style={styles.cardField}>
                <Text style={styles.fieldLabel}>Contact Details</Text>
                <Text style={styles.fieldValue}>{contactDetails}</Text>
              </View>
            </View>

            {/* Sending By Section */}
            <View style={styles.checklistSection}>
              <Text style={styles.cardHeader}>SENDING BY</Text>
              <View style={styles.checkboxGrid}>
                {["Email", "Messenger", "FTP", "FEDEX"].map((item) => (
                  <Checkbox
                    key={item}
                    checked={sendingBys.includes(item)}
                    label={item}
                  />
                ))}
              </View>
            </View>
          </View>

          {/* Right Column: Checklists */}
          <View style={styles.rightColumn}>
            {/* Scope Submittals */}
            <View style={styles.checklistSection}>
              <Text style={styles.cardHeader}>SCOPE FOR SUBMITTAL</Text>
              <View style={styles.checkboxGrid}>
                {["Shop Drawings", "Approval", "Erection Drawings", "Re-Approval", "Reports", "Review and Comment", "3D Model", "Fabrication"].map((item) => (
                  <Checkbox
                    key={item}
                    checked={scopeSubmittals.includes(item)}
                    label={item}
                  />
                ))}
              </View>
            </View>

            {/* Drawing Requirements */}
            <View style={styles.checklistSection}>
              <Text style={styles.cardHeader}>DRAWING REQUIREMENT</Text>
              <View style={styles.checkboxGrid}>
                {["Structural Detailing", "Deck Drawing", "Structural Engineering", "Structural Estimation"].map((item) => (
                  <Checkbox
                    key={item}
                    checked={drawingRequirements.includes(item)}
                    label={item}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Scope of Work Image Area */}
        <View style={styles.scopeCard}>
          <Text style={styles.scopeHeader}>SCOPE OF WORK REFERENCE</Text>
          {scopeOfWork ? (
            <Text style={styles.scopeText}>{scopeOfWork}</Text>
          ) : (
            <Text style={styles.scopeTextPlaceholder}>No CAD/Scope reference specified.</Text>
          )}
        </View>

        {/* Pricing Banner */}
        <View style={styles.pricingBanner}>
          <View style={styles.priceContainer}>
            <Text style={styles.pricingLabel}>PROJECT VALUE</Text>
            <Text style={styles.priceValue}>$ {Number(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          </View>
          <View style={styles.scheduleContainer}>
            <Text style={styles.pricingLabel}>SCHEDULE FOR APPROVAL</Text>
            <Text style={styles.scheduleValue}>1 Weeks</Text>
          </View>
        </View>

        {/* Notes */}
        <View style={styles.notesCard}>
          <Text style={styles.notesTitle}>PLEASE NOTE:</Text>
          <Text style={styles.notesText}>
            This quote is based solely on the current directions and files provided. Any additional
            members required due to revised, updated, or newly issued section detail drawings may
            impact both the cost and schedule.
          </Text>
        </View>

        {/* Footer / Signatures */}
        <View style={styles.footer}>
          <View style={styles.signatureBlock}>
            <Text style={styles.sigLabel}>Authorized Signature:</Text>
            <Image src={logo} style={styles.sigLogo} />
            <View style={styles.sigLine} />
            <Text style={styles.sigFinePrint}>If enclosures are not as noted, kindly notify us at once.</Text>
          </View>
          <View style={styles.sealBlock}>
            <Text style={styles.sigLabel}>Client Acceptance Stamp & Seal:</Text>
            <View style={styles.sealBox}>
              <Text style={styles.sealPlaceholder}>Acceptance Signature & Date</Text>
            </View>
          </View>
        </View>
      </Page>

      {/* Page 2: Inclusions & Exclusions */}
      {(inclusions || exclusions || remarks) ? (
        <Page size="A4" style={styles.page}>
          {/* Header Section for Page 2 */}
          <View style={styles.header}>
            <View style={styles.branding}>
              <Image src={logo} style={styles.logo} />
              <View style={styles.companyInfo}>
                <Text style={styles.companyName}>STEEL DIMENSION LLC</Text>
                <Text style={styles.tagline}>Precision in Every Detail, Strength in Every Structure...!</Text>
              </View>
            </View>
            <View style={styles.titleContainer}>
              <Text style={[styles.title, { color: "#1e293b" }]}>ANNEXURE: BID TERMS</Text>
              <View style={[styles.titleBar, { backgroundColor: "#1e293b" }]} />
            </View>
          </View>

          {/* Meta Reference */}
          <View style={[styles.metaCard, { paddingVertical: 6, marginBottom: 12 }]}>
            <View style={styles.metaRow}>
              <View style={styles.metaCell}>
                <Text style={styles.metaLabel}>Quotation Reference</Text>
                <Text style={styles.metaValueHighlight}>{id}</Text>
              </View>
              <View style={styles.metaCell}>
                <Text style={styles.metaLabel}>Project Name</Text>
                <Text style={styles.metaValue}>{project}</Text>
              </View>
            </View>
          </View>

          {/* Inclusions */}
          {inclusions ? (
            <View style={styles.annexSection}>
              <Text style={styles.annexHeader}>INCLUSIONS</Text>
              <Text style={styles.annexText}>{inclusions}</Text>
            </View>
          ) : null}

          {/* Exclusions */}
          {exclusions ? (
            <View style={styles.annexSection}>
              <Text style={styles.annexHeader}>EXCLUSIONS</Text>
              <Text style={styles.annexText}>{exclusions}</Text>
            </View>
          ) : null}

          {/* Internal Remarks */}
          {remarks ? (
            <View style={styles.annexSection}>
              <Text style={styles.annexHeader}>REMARKS & NOTES</Text>
              <Text style={styles.annexText}>{remarks}</Text>
            </View>
          ) : null}
        </Page>
      ) : null}
    </Document>
  );
};

export default EstimationPDF;
