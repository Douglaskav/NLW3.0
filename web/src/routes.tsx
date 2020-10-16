import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanangesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path='/app' component={OrphanangesMap} />

        <Route path="/orphanage/create" component={CreateOrphanage} />
       <Route path="/orphanage/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;
