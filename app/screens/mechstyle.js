import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  // General container styles
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  header: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#999999",
    marginBottom: 12,
  },

  // Picker styles
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  // Item styles
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#e3e3e3",
    flexDirection: "column",
    alignItems: "center",
  },
  itemRow: {
    width,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: "500",
    color: "#737373",
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },

  // Placeholder styles
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
    backgroundColor: "transparent",
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: "#e5e7eb",
    borderStyle: "dashed",
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },

  // Button styles
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#007aff",
    borderColor: "#007aff",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },

  // Appointment-specific styles
  appointmentCard: {
    backgroundColor: "#efe6e1",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 4,
  },
  actionButton: {
    backgroundColor: "#007aff",
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  actionButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  noAppointments: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },
});
