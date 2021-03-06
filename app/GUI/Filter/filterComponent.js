import React, { Component, PropTypes } from 'react';
import { Grid, Col, Row, ButtonGroup, Button, Well } from 'react-bootstrap';

import ActiveTags from './activeTags';
import NewTag from './newTag';
import AdvancedRegExp from './advancedRegExp';

export default class FilterComponent extends Component {
  setFilterLinkInternal(type) {
    const { app, setFilterLink } = this.props;
    const { filterObject } = app;
    setFilterLink(filterObject, type, this.context.router);
  }

  setFilterInternal(obj) {
    const { setFilter } = this.props;
    setFilter(obj, this.context.router);
  }

  render() {
    const { app, setRegExp } = this.props;
    const { filterObject, filterLink, regExp, advancedMode, allTowns, filteredTowns } = app;
    const { start, end, any } = filterObject;

    const content = [];
    const filterText = [];
    if (!filteredTowns.length) {
      filterText.push(<span key={'nt'}>No places loaded, try relaxing the filter.</span>);
    } else if (filteredTowns.length === allTowns.length) {
      filterText.push(<span key={'at'}>All {allTowns.length} places
      loaded, no active filter.</span>);
    } else {
      filterText.push(<div key={'ft'}>
        {filteredTowns.length} of {allTowns.length} places loaded
        ({`${(Math.round(10000 * filteredTowns.length / allTowns.length) / 100)}%`})
      </div>);
    }

    if (!advancedMode) {
      content.push(<Grid fluid key={'notAdvFilter'}>
        <Row>
          <Col xs={12}>
            <h3>Filter</h3>
            Linked by:{' '}
            <ButtonGroup>
              <Button
                bsSize={'xsmall'}
                bsStyle={filterLink === 'AND' ? 'primary' : 'default'}
                onClick={() => this.setFilterLinkInternal('AND')}
              >AND
              </Button>
              <Button
                bsSize={'xsmall'}
                bsStyle={filterLink === 'OR' ? 'primary' : 'default'}
                onClick={() => this.setFilterLinkInternal('OR')}
              >OR
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <h4>Starts with...</h4>
            <NewTag
              position={'start'}
              setFilter={(o) => this.setFilterInternal(o)}
              filterObject={filterObject}
            />
            <ActiveTags
              position={'start'}
              tags={start}
              filterObject={filterObject}
              setFilter={(o) => this.setFilterInternal(o)}
            />
          </Col>
          <Col xs={4}>
            <h4>Ends in...</h4>
            <NewTag
              position={'end'}
              setFilter={(o) => this.setFilterInternal(o)}
              filterObject={filterObject}
            />
            <ActiveTags
              position={'end'}
              tags={end}
              setFilter={(o) => this.setFilterInternal(o)}
              filterObject={filterObject}
            />
          </Col>
          <Col xs={4}>
            <h4>Contains...</h4>
            <NewTag
              position={'any'}
              setFilter={(o) => this.setFilterInternal(o)}
              filterObject={filterObject}
            />
            <ActiveTags
              position={'any'}
              tags={any}
              filterObject={filterObject}
              setFilter={(o) => this.setFilterInternal(o)}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Well>
              {filterText}
            </Well>
          </Col>
        </Row>
      </Grid>);
    } else {
      content.push(
        <Grid fluid key={'advFilterGrid'}>
          <Row>
            <Col xs={12}>
              <h3>Filter</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <AdvancedRegExp
                key={'advFilter'}
                regExp={regExp}
                setRegExp={setRegExp}
              />
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs={12}>
              <Well>
                {filterText}
              </Well>
            </Col>
          </Row>
        </Grid>
      );
    }

    return (
      <div>{content}</div>
    );
  }
}

FilterComponent.propTypes = {
  app: PropTypes.object,
  setFilter: PropTypes.func.isRequired,
  setFilterLink: PropTypes.func.isRequired,
  setRegExp: PropTypes.func.isRequired,
};

FilterComponent.contextTypes = {
  router: PropTypes.object,
};
