// loadQueries.js
// XML 파일을 읽고 파싱한 후 쿼리를 로드하는 기능을 수행합니다.
/*
XML 쿼리 로드하기
XML 파싱 라이브러리를 사용하여 XML 파일을 불러오고
각 쿼리를 ID로 식별하여 가져옵니다.
*/

const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const loadQueries = async () => {
  const filePath = path.join(__dirname, 'queries.xml');
  const xmlData = await fs.promises.readFile(filePath, 'utf-8');

  return new Promise((resolve, reject) => {
    xml2js.parseString(xmlData, { explicitArray: false }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        // XML 파싱 후 쿼리 처리
        const queries = result.queries.query.map(q => {
          if (q._) {
            return q._.trim(); // '_속성'에서 실제 문자열을 추출하여 trim 적용
          }
          console.warn('Unexpected structure for query:', q); // 예상치 못한 구조일 경우 경고
          return ''; // 텍스트가 없는 경우 빈 문자열로 처리
        }).join(' ');

        resolve(queries);
      }
    });
  });
};

module.exports = loadQueries;