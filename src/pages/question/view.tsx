import { useParams } from "react-router-dom";
import { Text } from "@mantine/core";

export function ViewQuestionPage() {
  const { id } = useParams<"id">();
  return <Text>Viewing question id ${id}</Text>;
}
