import { ActionIcon, Stack, Text } from "@mantine/core";
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getThreadVotesKey,
  requestGetThreadVotes,
} from "../../services/forum/get-thread-votes.ts";
import { requestCreateThreadVote } from "../../services/forum/create-thread-vote.ts";
import {
  authRequestQueryKey,
  requestAuthRefresh,
} from "../../services/account/auth-refresh.ts";

export function ThreadVotes({ id }: { id: string | number }) {
  const queryClient = useQueryClient();

  const { data: userData } = useQuery(authRequestQueryKey, requestAuthRefresh, {
    retry: 0,
  });

  const { data } = useQuery(
    getThreadVotesKey(id),
    () => requestGetThreadVotes(id),
    {
      enabled: !!id,
    },
  );

  const { mutate } = useMutation(requestCreateThreadVote, {
    onSuccess() {
      return queryClient.invalidateQueries(getThreadVotesKey(id));
    },
  });

  return (
    <Stack align="center">
      <ActionIcon
        color={
          data?.results?.some?.(
            (t) => t.fields.user_id === userData?.pk && t.fields.is_upvote,
          )
            ? "blue"
            : undefined
        }
        size="lg"
        radius="xl"
        variant="outline"
        onClick={() =>
          mutate({
            thread: Number(id),
            is_upvote: true,
          })
        }
      >
        <IconThumbUp size="1.625rem" />
      </ActionIcon>
      <Text fz="lg" fw={600}>
        {data?.count}
      </Text>
      <ActionIcon
        color={
          data?.results?.some?.(
            (t) => t.fields.user_id === userData?.pk && !t.fields.is_upvote,
          )
            ? "blue"
            : undefined
        }
        size="lg"
        radius="xl"
        variant="outline"
        onClick={() =>
          mutate({
            thread: Number(id),
            is_upvote: false,
          })
        }
      >
        <IconThumbDown size="1.625rem" />
      </ActionIcon>
    </Stack>
  );
}
