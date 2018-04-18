import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AppProvider from 'lib/app_provider';
<%_ if (accounts) { _%>
import Authentication from 'components/authentication';
<%_ } _%>
import MainLayout from 'components/main_layout';
import NotFound from 'components/not_found';
<%_ if (baseStyles) { _%>
import 'styles/global.css';
<%_ } _%>

render(
  <AppProvider>
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <%_ if (accounts) { _%>
          <Route exact path='/' component={Authentication} />
          <%_ } _%>
          <Route path='*' component={NotFound} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  </AppProvider>,
  document.getElementById('app')
);
