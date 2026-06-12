import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Original CSS from 2016-roblox-main
import './services/2016-roblox-main/styles/globals.css';
import './services/2016-roblox-main/styles/helpers/textHelpers.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Stores
import AuthenticationStore from './services/2016-roblox-main/stores/authentication';
import LoginModalStore from './services/2016-roblox-main/stores/loginModal';
import NavigationStore from './services/2016-roblox-main/stores/navigation';
import ThumbnailStore from './services/2016-roblox-main/stores/thumbnailStore';

// Shell components
import Navbar from './services/2016-roblox-main/components/navbar';
import Footer from './services/2016-roblox-main/components/footer';
import MainWrapper from './services/2016-roblox-main/components/mainWrapper';
import GlobalAlert from './services/2016-roblox-main/components/globalAlert';
import Chat from './services/2016-roblox-main/components/chat';

// Page components
import Login from './services/2016-roblox-main/components/loginPage';
import MyDashboard from './services/2016-roblox-main/components/myDashboard';
import DashboardStore from './services/2016-roblox-main/components/myDashboard/stores/dashboardStore';
import Theme2016 from './services/2016-roblox-main/components/theme2016';
import CatalogPage from './services/2016-roblox-main/pages/catalog/index';
import DevelopPage from './services/2016-roblox-main/pages/develop';
import GamesPage from './services/2016-roblox-main/pages/games/index';
import UserProfilePage from './services/2016-roblox-main/pages/users/[userId]/profile';
import UserFriendsPage from './services/2016-roblox-main/pages/users/[userId]/friends';
import UserFavoritesPage from './services/2016-roblox-main/pages/users/[userId]/favorites';
import UserInventoryPage from './services/2016-roblox-main/pages/users/[userId]/inventory';
import ItemPage from './services/2016-roblox-main/pages/catalog/[assetId]/[name]';
import GamePage from './services/2016-roblox-main/pages/games/[assetId]/[name]';
import DownloadPage from './services/2016-roblox-main/pages/download';
import NotFoundPage from './services/2016-roblox-main/pages/404';
import MyAccountPage from './services/2016-roblox-main/pages/My/Account';
import MyCharacterPage from './services/2016-roblox-main/pages/My/Character.aspx';
import MyMessagesPage from './services/2016-roblox-main/pages/My/Messages';
import MyMoneyPage from './services/2016-roblox-main/pages/My/Money.aspx';
import MyTradesPage from './services/2016-roblox-main/pages/My/Trades.aspx';
import MyGroupsPage from './services/2016-roblox-main/pages/My/Groups.aspx';
import MyGroupAdmin from './services/2016-roblox-main/pages/My/GroupAdmin.aspx';
import MyItemPage from './services/2016-roblox-main/pages/My/Item.aspx';
import CreateGroupPage from './services/2016-roblox-main/pages/My/CreateGroup.aspx';
import CreateUserAdPage from './services/2016-roblox-main/pages/My/CreateUserAd.aspx';
import PlaceUpdatePage from './services/2016-roblox-main/pages/places/[placeId]/update';
import SearchUsersPage from './services/2016-roblox-main/pages/search/users';
import ForumDefaultPage from './services/2016-roblox-main/pages/Forum/Default.aspx';
import MyForumsPage from './services/2016-roblox-main/pages/Forum/MyForums.aspx';
import ShowForumPage from './services/2016-roblox-main/pages/Forum/ShowForum.aspx';
import ShowPostPage from './services/2016-roblox-main/pages/Forum/ShowPost.aspx';
import AddPostPage from './services/2016-roblox-main/pages/Forum/AddPost.aspx';
import GroupAuditPage from './services/2016-roblox-main/pages/Groups/Audit.aspx';
import TradeWindowPage from './services/2016-roblox-main/pages/Trade/TradeWindow.aspx';
import ComposeMessagePage from './services/2016-roblox-main/pages/messages/compose';

const HomePage = () => (
  <Theme2016>
    <DashboardStore.Provider>
      <MyDashboard />
    </DashboardStore.Provider>
  </Theme2016>
);

const IndexPage = () => {
  const auth = AuthenticationStore.useContainer();
  if (auth.isAuthenticated) return <Navigate to="/home" replace />;
  return <Navigate to="/login" replace />;
};

const AppShell = () => (
  <AuthenticationStore.Provider>
    <LoginModalStore.Provider>
      <NavigationStore.Provider>
        <Navbar />
      </NavigationStore.Provider>
    </LoginModalStore.Provider>
    <GlobalAlert />
    <MainWrapper>
      <ThumbnailStore.Provider>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:assetId/:name" element={<ItemPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/:assetId/:name" element={<GamePage />} />
          <Route path="/develop" element={<DevelopPage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/users/:userId/profile" element={<UserProfilePage />} />
          <Route path="/users/:userId/friends" element={<UserFriendsPage />} />
          <Route path="/users/:userId/favorites" element={<UserFavoritesPage />} />
          <Route path="/users/:userId/inventory" element={<UserInventoryPage />} />
          <Route path="/search/users" element={<SearchUsersPage />} />
          <Route path="/My/Account" element={<MyAccountPage />} />
          <Route path="/My/Character.aspx" element={<MyCharacterPage />} />
          <Route path="/My/Messages" element={<MyMessagesPage />} />
          <Route path="/My/Money.aspx" element={<MyMoneyPage />} />
          <Route path="/My/Trades.aspx" element={<MyTradesPage />} />
          <Route path="/My/Groups.aspx" element={<MyGroupsPage />} />
          <Route path="/My/GroupAdmin.aspx" element={<MyGroupAdmin />} />
          <Route path="/My/Item.aspx" element={<MyItemPage />} />
          <Route path="/My/CreateGroup.aspx" element={<CreateGroupPage />} />
          <Route path="/My/CreateUserAd.aspx" element={<CreateUserAdPage />} />
          <Route path="/places/:placeId/update" element={<PlaceUpdatePage />} />
          <Route path="/Forum/Default.aspx" element={<ForumDefaultPage />} />
          <Route path="/Forum/MyForums.aspx" element={<MyForumsPage />} />
          <Route path="/Forum/ShowForum.aspx" element={<ShowForumPage />} />
          <Route path="/Forum/ShowPost.aspx" element={<ShowPostPage />} />
          <Route path="/Forum/AddPost.aspx" element={<AddPostPage />} />
          <Route path="/Groups/Audit.aspx" element={<GroupAuditPage />} />
          <Route path="/Trade/TradeWindow.aspx" element={<TradeWindowPage />} />
          <Route path="/messages/compose" element={<ComposeMessagePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Chat />
      </ThumbnailStore.Provider>
    </MainWrapper>
    <Footer />
  </AuthenticationStore.Provider>
);

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
