import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanangesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import OrphanageSuccess from './pages/OrphanageSuccess';
import OrphanageLogin from './pages/OrphanageLogin';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" exact component={OrphanangesMap} />

        <Route path="/orphanage/create" component={CreateOrphanage} />
        <Route path="/orphanage/:id"  component={Orphanage} />

        <Route path="/app/success" component={OrphanageSuccess} />

        <Route path="/app/login" component={OrphanageLogin} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;
