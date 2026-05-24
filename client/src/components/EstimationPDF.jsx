import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import logo from "../assets/logo.svg";

// Register fonts if needed, but Roboto is standard or we can use Helvetica
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#333",
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    marginBottom: 0,
  },
  headerLeft: {
    width: "50%",
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
  },
  headerRight: {
    width: "50%",
    backgroundColor: "#e74c3c", // Red background for title
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 60,
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  contactInfo: {
    fontSize: 8,
    lineHeight: 1.5,
  },
  metaGrid: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },
  metaItem: {
    width: "50%",
    flexDirection: "row",
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
  },
  label: {
    width: "40%",
    fontWeight: "bold",
  },
  value: {
    width: "60%",
  },
  sectionHeader: {
    backgroundColor: "#f4f4f4",
    padding: 5,
    fontWeight: "bold",
    textDecoration: "underline",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  infoGrid: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  infoLeft: {
    width: "50%",
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: "#000",
  },
  infoRight: {
    width: "50%",
  },
  checkboxGroup: {
    padding: 5,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  checkbox: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    fontSize: 8,
  },
  scopeImage: {
    width: "100%",
    height: 250,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  pricingBanner: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    backgroundColor: "#fff",
  },
  priceText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  notes: {
    padding: 10,
    fontStyle: "italic",
    fontSize: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  footer: {
    flexDirection: "row",
    paddingTop: 20,
  },
  signatureBlock: {
    width: "45%",
  },
  sealBlock: {
    width: "55%",
    paddingLeft: 20,
    borderLeftWidth: 1,
    borderLeftColor: "#000",
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    width: "100%",
    marginTop: 20,
  },
});

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
  } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image src={logo} style={styles.logo} />
            <View style={styles.contactInfo}>
              <Text>www.SteelDimension.com</Text>
              <Text>Estimation@SteelDimension.com</Text>
              <Text>+1 727-378-1270</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.title}>Letter of Quotation</Text>
          </View>
        </View>

        {/* Meta Info Grid */}
        <View style={styles.metaGrid}>
          <View style={styles.metaItem}>
            <Text style={styles.label}>Quotation Number:</Text>
            <Text style={styles.value}>{id}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.label}>Received Date:</Text>
            <Text style={styles.value}>{data.receivedDate || "N/A"}</Text>
          </View>
        </View>
        <View style={styles.metaGrid}>
          <View style={styles.metaItem}>
            <Text style={styles.label}>Job Name:</Text>
            <Text style={styles.value}>{project}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.label}>Bid Date:</Text>
            <Text style={styles.value}>{data.bidDate || "N/A"}</Text>
          </View>
        </View>

        {/* Info Grid */}
        <View style={styles.infoGrid}>
          <View style={styles.infoLeft}>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.label}>Client Name:</Text>
              <Text>{companyName}</Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.label}>Address:</Text>
              <Text>{location}</Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.label}>Project Manager:</Text>
              <Text>N/A</Text>
            </View>
            <View>
              <Text style={styles.label}>Contact Details:</Text>
              <Text>N/A</Text>
            </View>

            <View style={{ marginTop: 15 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Sending by:</Text>
              <View style={styles.checkboxItem}>
                <View style={styles.checkbox}><Text style={styles.checkmark}>✓</Text></View>
                <Text>Email</Text>
                <View style={[styles.checkbox, { marginLeft: 20 }]}></View>
                <Text>Messenger</Text>
              </View>
              <View style={styles.checkboxItem}>
                <View style={styles.checkbox}></View>
                <Text>FTP</Text>
                <View style={[styles.checkbox, { marginLeft: 27 }]}></View>
                <Text>FEDEX</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoRight}>
            <Text style={styles.sectionHeader}>Scope for Submittal:</Text>
            <View style={styles.checkboxGroup}>
              <View style={styles.checkboxItem}>
                <View style={styles.checkbox}><Text style={styles.checkmark}>✓</Text></View>
                <Text style={{ width: 100 }}>Shop Drawings</Text>
                <View style={styles.checkbox}><Text style={styles.checkmark}>✓</Text></View>
                <Text>Approval</Text>
              </View>
              <View style={styles.checkboxItem}>
                <View style={styles.checkbox}><Text style={styles.checkmark}>✓</Text></View>
                <Text style={{ width: 100 }}>Erection Drawings</Text>
                <View style={styles.checkbox}></View>
                <Text>Re-Approval</Text>
              </View>
              <View style={styles.checkboxItem}>
                <View style={styles.checkbox}><Text style={styles.checkmark}>✓</Text></View>
                <Text style={{ width: 100 }}>Reports</Text>
                <View style={styles.checkbox}></View>
                <Text>Review and Comment</Text>
              </View>
              <View style={styles.checkboxItem}>
                <View style={styles.checkbox}><Text style={styles.checkmark}>✓</Text></View>
                <Text style={{ width: 100 }}>3D Model</Text>
                <View style={styles.checkbox}><Text style={styles.checkmark}>✓</Text></View>
                <Text>Fabrication</Text>
              </View>
            </View>

            <Text style={styles.sectionHeader}>Drawing requirement:</Text>
            <View style={styles.checkboxGroup}>
              <View style={styles.checkboxItem}>
                <View style={styles.checkbox}><Text style={styles.checkmark}>✓</Text></View>
                <Text style={{ width: 100 }}>Structural Detailing</Text>
                <View style={styles.checkbox}></View>
                <Text>Deck Drawing</Text>
              </View>
              <View style={styles.checkboxItem}>
                <View style={styles.checkbox}></View>
                <Text style={{ width: 100 }}>Structural Engineering</Text>
                <View style={styles.checkbox}></View>
                <Text>Structural Estimation</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Scope of Work Image Area */}
        <View style={styles.scopeImage}>
          <Text style={{ color: "#ccc" }}>Scope of work reference area</Text>
        </View>

        {/* Pricing Banner */}
        <View style={styles.pricingBanner}>
          <View style={{ width: "50%" }}>
            <Text style={styles.priceText}>Project Price: $ {Number(price).toFixed(2)}</Text>
          </View>
          <View style={{ width: "50%" }}>
            <Text style={styles.priceText}>Schedule for approval: 1 Weeks</Text>
          </View>
        </View>

        {/* Notes */}
        <View style={styles.notes}>
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Please Note:</Text>
          <Text>
            *This quote is based solely on the current directions and files provided. Any additional
            members required due to revised, updated, or newly issued section detail drawings may
            impact both the cost and schedule.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.signatureBlock}>
            <Text>Signed:</Text>
            <View style={styles.signatureLine} />
            <Text style={{ fontSize: 8, marginTop: 10 }}>If enclosures are not as noted, kindly notify us at once.</Text>
          </View>
          <View style={styles.sealBlock}>
            <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Client Sign and Seal as acceptable:</Text>
            <View style={{ height: 60, borderWidth: 1, borderColor: "#ccc", borderStyle: "dashed" }} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default EstimationPDF;
