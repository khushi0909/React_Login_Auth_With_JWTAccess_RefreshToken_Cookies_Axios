import './index.css';
// import Register from '.components/Register';
import Register from './components/Register'
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import {Routes,Route} from 'react-router-dom'
import RequiredAuth from './components/RequiredAuth';


const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>

        {/* public routes */}
        <Route path="/" element={<Home />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequiredAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequiredAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>


        <Route element={<RequiredAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequiredAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>
         

        {/* catch all */}
        <Route path="*" element={<Missing />} />
        </Route>
    </Routes>
  );
}

export default App;
