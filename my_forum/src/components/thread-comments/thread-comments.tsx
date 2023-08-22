import { Avatar, Box, Group, Stack } from "@mantine/core";
import demoAvatarImage from "../../assets/avata.jpeg";
import { useQuery } from "@tanstack/react-query";
import {
  getAllThreadsQueryKey,
  requestGetAllThreads,
} from "../../services/forum/get-all-threads.ts";

export function ThreadComments({ id }: { id: string | number }) {
  const { data } = useQuery(getAllThreadsQueryKey(id), () =>
    requestGetAllThreads(id),
  );
  return (
    <Stack>
      {data &&
        data.results.map((threadModel) => (
          <Group key={threadModel.pk}>
            <Avatar src={demoAvatarImage} color="blue" radius="sm" size="sm" />
            <Box>
              {threadModel?.fields?.content && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: threadModel.fields.content,
                  }}
                />
              )}
            </Box>
          </Group>
        ))}
    </Stack>
  );
}
