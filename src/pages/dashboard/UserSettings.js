import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUserList, getMyInfo } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import UserNewForm from '../../components/_dashboard/user/UserNewForm';

// ----------------------------------------------------------------------

export default function UserSettings() {
  const { themeStretch } = useSettings();
  const [currentUser, setCurrentUser] = useState({});
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const isEdit = pathname.includes('edit');

  console.log(currentUser);

  useEffect(() => {
    dispatch(getMyInfo());
  }, [dispatch]);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <Page title="사용자수정 | Cloud's pick">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? '사용자추가' : '사용자수정'}
          links={[
            { name: 'Admin', href: PATH_DASHBOARD.root },
            { name: '사용자관리', href: PATH_DASHBOARD.user.root },
            { name: !isEdit ? '사용자추가' : id }
          ]}
        />

        <UserNewForm isEdit={isEdit} currentUser={currentUser} />
      </Container>
    </Page>
  );
}
