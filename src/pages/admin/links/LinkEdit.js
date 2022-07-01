import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// material
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { fetchLinks } from '../../../redux/slices/link';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import LinkEditForm from '../../../components/_admin/links/LinkEditForm';

// ----------------------------------------------------------------------

export default function LinkEdit() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { links } = useSelector((state) => state.link);
  const currentLink = links.find((link) => String(link.id) === id);

  useEffect(() => {
    dispatch(fetchLinks());
  }, [dispatch]);

  return (
    <Page title="Admin: 링크수정 | Cloud's pick">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="링크수정"
          links={[
            { name: 'Admin', href: PATH_DASHBOARD.root },
            { name: '링크관리', href: PATH_DASHBOARD.root },
            { name: id }
          ]}
        />

        <LinkEditForm currentLink={currentLink} />
      </Container>
    </Page>
  );
}
