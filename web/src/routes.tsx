import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanangesMap from './pages/OrphanagesMap';
import OrphanageDetail from './pages/OrphanageDetail';
import CreateOrphanage from './pages/CreateOrphanage';
import ConfirmOrphanage from './pages/ConfirmOrphanage';
import OrphanageSuccess from './pages/OrphanageSuccess';
import OrphanageError from './pages/OrphanageError';
import OrphanageLogin from './pages/OrphanageLogin';
import ForgetPassword from './pages/ForgetPassword';
import RecivedEmailPage from './pages/RecivedEmailPage';
import OrphanageAdmin from './pages/OrphanageAdmin';
// import OrphanagePending from './pages/OrphanagePending';
// import OrphanageRegistred from './pages/OrphanageRegistred';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" exact component={OrphanangesMap} />

        <Route path="/orphanage/create" component={CreateOrphanage} />
        <Route path="/orphanage/:id"  component={OrphanageDetail} />

        <Route path="/app/success" component={OrphanageSuccess} />
        <Route path="/app/error" component={OrphanageError} />

        <Route path="/app/login" component={OrphanageLogin} />
        <Route path="/app/forgetPassword" component={ForgetPassword} />

        <Route path="/app/recived" component={RecivedEmailPage} />

        <Route path="/app/admin" component={OrphanageAdmin} />
        <Route path="/app/confirm" component={ConfirmOrphanage} />
      </Switch>
    </BrowserRouter>
  )
}
