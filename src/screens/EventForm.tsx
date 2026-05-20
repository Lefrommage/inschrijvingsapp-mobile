import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

type EventFormProps = {
  EventFilledIn: (
    title: string,
    description: string,
    location: string,
    date: string,
    participants: number,
  ) => void;
};

const eventFormSchema = yup.object({
  title: yup.string().required("Titel is verplicht"),
  description: yup.string().required("Beschrijving is verplicht"),
  location: yup.string().required("Locatie is verplicht"),
  date: yup.string().required("Datum is verplicht"),
  maxParticipants: yup
    .number()
    .required("Aantal deelnemers is verplicht")
    .positive("Moet groter zijn dan 0")
    .integer("Moet een geheel getal zijn"),
});

const EventForm = ({ EventFilledIn }: EventFormProps) => {
  return (
    <View>
      <Text style={styles.title}>Nieuw event toevoegen</Text>

      <Formik
        initialValues={{
          title: "",
          description: "",
          location: "",
          date: "",
          maxParticipants: "",
        }}
        validationSchema={eventFormSchema}
        onSubmit={(values) => {
          EventFilledIn(
            values.title,
            values.description,
            values.location,
            values.date,
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

            <TextInput
              style={styles.input}
              placeholder="Datum bv. 2026-05-20"
              value={values.date}
              onChangeText={handleChange("date")}
              onBlur={handleBlur("date")}
            />
            {touched.date && errors.date && (
              <Text style={styles.error}>{errors.date}</Text>
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
  error: {
    color: "red",
    marginBottom: 10,
  },
});
