import { useEffect } from 'react';
import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';

import { Authenticated } from '@/components/Authenticated';
import { FlexBox } from '@/components/FlexBox';
import { CreateTeams } from '@/components/Teams/CreateTeams';
import { TeamsList } from '@/components/TeamsList';
import { Integration } from '@/constants/integrations';
import { PageWrapper } from '@/content/PullRequests/PageWrapper';
import { useAuth } from '@/hooks/useAuth';
import { fetchTeams } from '@/slices/team';
import { useDispatch } from '@/store';
import { PageLayout } from '@/types/resources';

function Page() {
  const dispatch = useDispatch();
  const { role, orgId } = useAuth();

  useEffect(() => {
    if (!orgId) return;
    dispatch(
      fetchTeams({
        org_id: orgId,
        provider: Integration.GITHUB
      })
    );
  }, [dispatch, orgId]);

  return (
    <PageWrapper
      title={
        <FlexBox gap1 alignCenter>
          Teams
        </FlexBox>
      }
      pageTitle="Teams"
      showEvenIfNoTeamSelected
      hideAllSelectors
    >
      <TeamsList />
      <CreateTeams />
    </PageWrapper>
  );
}

Page.getLayout = (page: PageLayout) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);

export default Page;
