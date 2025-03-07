import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function RequestForm() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState<null | string>(null);

  const countWords = (text: string) => {
    return text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length;
  };

  const handleTextChange = (text: string) => {
    const wordCount = countWords(text);
    if (wordCount > 50) {
      setError("You can only enter up to 50 words.");
    } else {
      setError(null);
    }
    setMessage(text);
  };

  const handleSubmit = () => {
    if (!error && message.trim()) {
      console.log("Request Initiated:", message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your request (max 50 words):</Text>
      <TextInput
        style={[styles.textArea, error ? styles.errorBorder : null]}
        multiline
        placeholder="Type here..."
        value={message}
        onChangeText={handleTextChange}
      />
      <Text style={styles.wordCount}>{countWords(message)}/50 words</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.submitButton, error && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={!!error || !message.trim()}
      >
        <Text style={styles.submitButtonText}>Initiate Request</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    fontSize: 14,
    textAlignVertical: "top",
  },
  errorBorder: {
    borderColor: "red",
  },
  wordCount: {
    marginTop: 5,
    fontSize: 12,
    color: "#555",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

