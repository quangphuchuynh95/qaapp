import { useQuery } from "@tanstack/react-query";
import {
  getAllThreadsQueryKey,
  requestGetAllThreads,
} from "../../services/forum/get-all-threads.ts";
import {
  ActionIcon,
  Avatar,
  Box,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import demoAvatarImage from "../../assets/avata.jpeg";
import { ThreadComments } from "../thread-comments";
import {ThreadVotes} from "../thread-votes/thread-votes.tsx";

export function ThreadAnswers({ id }: { id: string }) {
  const { data } = useQuery(getAllThreadsQueryKey(id), () =>
    requestGetAllThreads(id),
  );
  return (
    <Stack>
      {data &&
        data.results.map((threadModel) => (
          <Paper key={threadModel.pk} withBorder p="xl" mb="xl">
            <Group align="start">
              <Box>
                <ThreadVotes id={threadModel.pk} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Stack align="start">
                  <Text>Answer at {threadModel?.fields?.created}</Text>
                  <Group>
                    <Avatar src={demoAvatarImage} color="blue" radius="sm" />
                    {threadModel?.fields?.creator_name ||
                      threadModel?.fields?.creator_email}
                  </Group>
                  <Box>
                    {threadModel?.fields?.content && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: threadModel.fields.content,
                        }}
                      />
                    )}
                  </Box>
                </Stack>
                <Divider my="md" />
                <ThreadComments id={threadModel.pk} />
              </Box>
            </Group>
          </Paper>
        ))}
    </Stack>
  );
}
