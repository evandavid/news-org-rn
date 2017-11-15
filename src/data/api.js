import axios from 'axios';
import Q from 'q';
import Singleton from './singleton';

export const API = {
  getSources: () => {
    const deferred = Q.defer();

    let application = Singleton.instance;
    let sources = application.getData('sources');

    if (sources) {
      deferred.resolve({ data: sources });
    } else {
      axios.get('/sources')
        .then((res) => {
          application.setData('sources', res.data);
          deferred.resolve(res);
        }, () => {
          deferred.resolve({ data: {sources: []} });
        });
    }

    return deferred.promise;
  },
  getArticles: sourceId => {
    const deferred = Q.defer();

    let application = Singleton.instance;
    let articles = application.getData(sourceId);

    if (articles) {
      deferred.resolve({ data: articles });
    } else {
      axios.get(`/articles?source=${sourceId}`)
        .then((res) => {
          application.setData(sourceId, res.data);
          deferred.resolve(res);
        }, () => {
          deferred.resolve({ data: {articles: []} });
        });
    }

    return deferred.promise;
  },
};
