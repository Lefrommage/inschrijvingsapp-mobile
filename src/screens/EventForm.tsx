import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";

type EventFormProps = {
  EventFilledIn: (
    title: string,
    description: string,
    location: string,
    date: Date,
    participants: number,
  ) => void;
};

const eventFormSchema = yup.object({
  title: yup.string().required("Titel is verplicht"),
  description: yup.string().required("Beschrijving is verplicht"),
  location: yup.string().required("Locatie is verplicht"),
  maxParticipants: yup
    .number()
    .typeError("Aantal deelnemers moet een getal zijn")
    .required("Aantal deelnemers is verplicht")
    .positive("Moet groter zijn dan 0")
    .integer("Moet een geheel getal zijn"),
});

const EventForm = ({ EventFilledIn }: EventFormProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pickerMode, setPickerMode] = useState<"date" | "time" | null>(null);

  const formattedDate = selectedDate.toLocaleString("nl-BE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View>
      <Text style={styles.title}>Nieuw event toevoegen</Text>

      <Formik
        initialValues={{
          title: "",
          description: "",
          location: "",
          maxParticipants: "",
        }}
        validationSchema={eventFormSchema}
        onSubmit={(values) => {
          EventFilledIn(
            values.title,
            values.description,
            values.location,
            selectedDate,
            Number(values.maxParticipants),
          );
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Titel"
              value={values.title}
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
            />
            {touched.title && errors.title && (
              <Text style={styles.error}>{errors.title}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Beschrijving"
              value={values.description}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
            />
            {touched.description && errors.description && (
              <Text style={styles.error}>{errors.description}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Locatie"
              value={values.location}
              onChangeText={handleChange("location")}
              onBlur={handleBlur("location")}
            />
            {touched.location && errors.location && (
              <Text style={styles.error}>{errors.location}</Text>
            )}

            <Text style={styles.label}>Datum en uur</Text>
            <Text style={styles.dateText}>{formattedDate}</Text>

            <View style={styles.buttonRow}>
              <View style={styles.buttonWrapper}>
                <Button
                  title="Kies datum"
                  onPress={() => setPickerMode("date")}
                />
              </View>

              <View style={styles.buttonWrapper}>
                <Button
                  title="Kies uur"
                  onPress={() => setPickerMode("time")}
                />
              </View>
            </View>

            {pickerMode && (
              <DateTimePicker
                value={selectedDate}
                mode={pickerMode}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                is24Hour={true}
                onChange={(event, date) => {
                  setPickerMode(null);

                  if (date) {
                    setSelectedDate(date);
                  }
                }}
              />
            )}

            <TextInput
              style={styles.input}
              placeholder="Max deelnemers"
              value={values.maxParticipants}
              onChangeText={handleChange("maxParticipants")}
              onBlur={handleBlur("maxParticipants")}
              keyboardType="numeric"
            />
            {touched.maxParticipants && errors.maxParticipants && (
              <Text style={styles.error}>{errors.maxParticipants}</Text>
            )}

            <Button title="Event toevoegen" onPress={() => handleSubmit()} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default EventForm;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "white",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  dateText: {
    marginBottom: 10,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  buttonWrapper: {
    flex: 1,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
