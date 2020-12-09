import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanangesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import OrphanageSuccess from './pages/OrphanageSuccess';
import OrphanageError from './pages/OrphanageError';
import OrphanageLogin from './pages/OrphanageLogin';
import ForgetPassword from './pages/ForgetPassword';
import RecivedEmailPage from './pages/RecivedEmailPage';
import OrphanagePending from './pages/OrphanagePending';
import OrphanageRegistred from './pages/OrphanageRegistred';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" exact component={OrphanangesMap} />

        <Route path="/orphanage/create" component={CreateOrphanage} />
        <Route path="/orphanage/:id"  component={Orphanage} />

        <Route path="/app/success" component={OrphanageSuccess} />
        <Route path="/app/error" component={OrphanageError} />

        <Route path="/app/login" component={OrphanageLogin} />
        <Route path="/app/forgetPassword" component={ForgetPassword} />

        <Route path="/app/recived" component={RecivedEmailPage} />

        <Route path="/app/admin/registred" component={OrphanageRegistred} />
        <Route path="/app/admin/pending" component={OrphanagePending} />
      </Switch>
    </BrowserRouter>
  )
}
