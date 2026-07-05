import define1 from "./cc6863a92d3c907e@240.js";

function _1(md){return(
md`# Projeto Final`
)}

function _world(FileAttachment){return(
FileAttachment("countries-50m.json").json()
)}

function _geodata(FileAttachment){return(
FileAttachment("medium.geo.json").json()
)}

function _countryCentroids(geodata,d3){return(
geodata.features.map(feature => {
  const [longitude, latitude] = d3.geoCentroid(feature);
  return {
    name: feature.properties.name,
    longitude: longitude,
    latitude: latitude
  };
})
)}

function _background_world_map(vl,world,width){return(
vl.markGeoshape({fill: '#eee', stroke: '#ddd'})
    .data(vl.topojson(world).feature('countries'))
    .project(vl.projection('equalEarth'))
    .width(width * 0.9)
    .height(400)
)}

function _country_dots_world_map(vl,countryCentroids){return(
vl.markCircle()
  .data(countryCentroids) // campos: 'name', 'latitude', 'longitude'
  .encode(
    vl.latitude().fieldQ('latitude'),
    vl.longitude().fieldQ('longitude'),
    vl.tooltip().fieldN('name')
  )
)}

function _world_map(vl,background_world_map,country_dots_world_map,width){return(
vl.layer(background_world_map, country_dots_world_map)
  .project(vl.projection('equalEarth'))
  .width(width * 0.8)
  .height(400)
  .render()
)}

function _kbblCrudeoilProduction(FileAttachment,dinamizeDate){return(
FileAttachment("kbbl-crudeoil-production.csv")
  .csv()
  .then(dinamizeDate)
)}

function _kbblCrudeoilExports(FileAttachment,dinamizeDate){return(
FileAttachment("kbbl-crudeoil-exports.csv")
  .csv()
  .then(dinamizeDate)
)}

function _kbblCrudeoilImports(FileAttachment,dinamizeDate){return(
FileAttachment("kbbl-crudeoil-imports.csv")
  .csv()
  .then(dinamizeDate)
)}

function _colors_for_top_production(){return(
{
    // os países abaixo são os top-8 produção (em algum intervalo de tempo qualquer)
    // por conveniência hardcoded (embora, claro, inicialmente obtido dos dados)
    // o motivo de ser hardcoded é que queremos deixar cores fixas para os países
    // mesmo que a seleção de países mostrados em um dado momento varie,
    // o mesmo país será associado à mesma cor; cor essa escolhida à mão
    "Saudi Arabia": "#CC915E",
    "Russian Federation": "#836DAB",
    "United States of America": "#273A8A",
    "China": "#C92424",
    "Canada": "#FA6868",
    "Kuwait": "#579C94",
    "Iraq": "#82552A",
    "Iran (Islamic Rep.)": "#3A703A",
    "Mexico": "#ABEBD2",
    "Venezuela": "#F7A072",
    "Norway": "#F772D4",
    "Brazil": "#009314",
    "United Arab Emirates": "#00A7E1",
    "Nigeria": "#DDF6C7",
    "Kazakhstan": "#F6D13C",
    "other": "#dddddd"
  }
)}

function _colors_for_top_exports(){return(
{
    // a ordem importa para a visão default (sem seleção)
    // ordem do top-8 exportação (depois dos 8 não importa a ordem)
    "Saudi Arabia": "#CC915E",
    "Russian Federation": "#836DAB",
    "Canada": "#FA6868",
    "Iraq": "#82552A",
    "Nigeria": "#DDF6C7",
    "Norway": "#F772D4",
    "Kuwait": "#579C94",
    "United Arab Emirates": "#00A7E1",
    "Iran (Islamic Rep.)": "#3A703A",
    "Mexico": "#ABEBD2",
    "United States of America": "#273A8A",
    "China": "#C92424",
    "Venezuela": "#F7A072",
    "Brazil": "#009314",
    "Kazakhstan": "#F6D13C",
    "other": "#dddddd"
  }
)}

function _colors_for_top_imports(){return(
{
    // a ordem importa para a visão default (sem seleção)
    // ordem do top-8 importação (depois dos 8 não importa a ordem)
    "United States of America": "#273A8A",
    "China": "#C92424",
    "India": "#F7A072",
    "Japan": "#AA6868",
    "Korea": "#BBA7E1",
    "Germany": "#F6D13C",
    "Italy": "#3A703A",
    "France": "#D472A4",
    "Spain": "#836DAB",
    "Dominican Republic": "#579C94",
    "other": "#dddddd"
}
)}

function _monthMap(){return(
{
  'Jan': 0,
  'Feb': 1,
  'Mar': 2,
  'Apr': 3,
  'May': 4,
  'Jun': 5,
  'Jul': 6,
  'Aug': 7,
  'Sep': 8,
  'Oct': 9,
  'Nov': 10,
  'Dec': 11
}
)}

function _strToDate(monthMap){return(
function (str) {
  const monthStr = str.slice(0, 3);
  const yearStr = str.slice(3);
  const month = monthMap[monthStr];
  const year = Number(yearStr);
  return new Date(year, month, 1);
}
)}

function _parseNumber(){return(
v => (v === "-" || v === "x" | v === "N/A" || v.trim() === "" ? null : +v)
)}

function _dinamizeDate(strToDate,parseNumber){return(
function (data) {
    return data.flatMap(line => {
      // line = {Country: "A", Jan2002: "B", Feb2002: "C"}
      const { Country: country, ...valueByDateStr } = line;
      // { country: "A", date: "Jan 2002", value: "B" }
      // { country: "A", date: "Feb 2002", value: "C" }
      return Object.entries(valueByDateStr).map(([dateStr, value]) => {
        return {
          country: country,
          date: strToDate(dateStr),
          value: parseNumber(value)        
        }});
    });
}
)}

function _NumberHighlightedCountries(Inputs){return(
Inputs.range([1, 8], {step: 1, label: "Número de países destacados", value: 5})
)}

function _StackedBarsDataSelection(Inputs,kbblCrudeoilProduction,colors_for_top_production,kbblCrudeoilExports,colors_for_top_exports,kbblCrudeoilImports,colors_for_top_imports){return(
Inputs.select(new Map([
  ["Produção", { data: kbblCrudeoilProduction, colors: colors_for_top_production, title: "Produção"}],
  ["Exportação", { data: kbblCrudeoilExports, colors: colors_for_top_exports, title: "Exportação"}],
  ["Importação", { data: kbblCrudeoilImports, colors: colors_for_top_imports, title: "Importação"}],
]), { label: "Critério"})
)}

function _rank_graph_over_time(rank_over_time,StackedBarsDataSelection,NumberHighlightedCountries){return(
rank_over_time(StackedBarsDataSelection.data, StackedBarsDataSelection.title, StackedBarsDataSelection.colors, NumberHighlightedCountries)
)}

function _rank_over_time(vl,width){return(
(data, serviceStr, colors, numberHighlightedCountries) => {
  // Recomendação numberHighlightedCountries: 5
  // Acima disso, alguns países podem ficar sem cor para algumas seleções de tempo!
  
  const timeInterval = vl.selectInterval('timeInterval')
    .encodings('x')
    .fields('year')
    .views(['bars']);
  const countrySelection = vl.selectPoint('countrySelection')
    .fields('country')
    .toggle('event.shiftKey')
    // seleciona apenas se o alvo do mouse for uma barra da direita
    .views(['legendBars'])
  
  const defaultCountries = JSON.stringify(Object.keys(colors).slice(0, numberHighlightedCountries));
  

  const isInInterval = `(datum.year >= timeInterval.year[0] && datum.year <= timeInterval.year[length(timeInterval.year) - 1])`;

  // Funciona assim
  // 1. se a seleção de países não for vazia (length(...) > 0) é porque o usuário selecionou países...
  //    então destacamos apenas os países na SELEÇÃO
  //    e os outros são colapsados como 'other'
  // 2. se a seleção de países for vazia, mas a seleção de tempo estiver ativa (timeInterval ativa)...
  //    então, para dar efeito de foco, destacamos apenas quem for top-K DENTRO do intervalo de tempo selecionado
  //    e todos os anos fora do período (assim como países abaixo de rank K) são colapsados como 'other'
  // 3. se nenhuma seleção estiver ativa (tudo vazio)...
  //    então destacamos apenas os países em defaultCountries
  //    e os outros são colapsados como 'other'
  const mapToOther = `
    length(data('countrySelection_store')) > 0 
      ? (vlSelectionTest('countrySelection_store', datum) ? datum.country : 'other') 
      : (
        isDefined(timeInterval.year) && length(timeInterval.year) > 0
          ? (${isInInterval} && datum.rank <= ${numberHighlightedCountries} ? datum.country : 'other') 
          : (indexof(${defaultCountries}, datum.country) >= 0 ? datum.country : 'other')
      )
  `;
  const unknownCountryColor = '#ddd';

  // BARRAS DA ESQUERDA (AO LONGO DO TEMPO)
  const bars = vl.markBar()
    .name('bars')
    .data(data)
    .transform(
      vl.filter(countrySelection),
      vl.filter('year(datum.date) < 2026'), // ignora 2026 (dados incompletos)
      vl.calculate('year(datum.date)').as('year'), 
      vl.calculate('datum.value / 1e6').as('value_gbbl'), // kbbl = 1e3 bbl = 1e-6 Gbbl
      // agrega para cada país e ano
      vl.aggregate(
        vl.sum('value_gbbl').as('sum_val')
      ).groupby(['year', 'country']),
      vl.window(vl.rank().as('rank'))
        .sort([{ field: 'sum_val', order: 'descending' }])
        .groupby(['year']),
      vl.calculate(mapToOther).as("country_or_other"),
      vl.aggregate(
        vl.sum('sum_val').as('sum_val_aggr'), // agrega valores pro "other"
        vl.max('rank').as('rank_aggr')
      ).groupby(['year', 'country_or_other']),
    )
    .encode(
      // Campos disponíveis: [year, sum_val_aggr, country_or_other, rank_aggr]
      vl.x()
        // o motivo de ser Ordinal é para que scale( ... padding config ...) funcione
        .fieldO('year')
        // o motivo de timeUnit é que apesar de o field 'year' já ser temporal e reduzido a um ano
        // na verdade internamente ele é o primeiro 'instante' daquele ano
        // por exemplo, 2002 é um objeto Date 2002-01-01 00:00 coisa assim.
        // o nome do label seria UTC blabla 2002-01-01 00:00
        // então aplico timeUnit de novo
        //.timeUnit({unit: 'year', binned: true}) // binned: true para indicar que já está binnado
        .scale({ paddingOuter: 0.4, paddingInner: 0.2 })  // |2002 2004 ... | --> | 2002  2004 ... |
        // qualquer valor labelSeparation > 0 parece funcionar
        .axis({ labelOverlap: true, labelSeparation: 1, padding: 10 }) // 2002 2003 2004 --> 2002    2004
        .title(''),
      vl.y()
        .fieldQ('sum_val_aggr')
        .title(`${serviceStr} de petróleo bruto (Gbbl)`),
      vl.color().fieldN('country_or_other')
        //.if(isUnknownCountryLeft, vl.value(unknownCountryColor))
        .scale({ domain: Object.keys(colors), range: Object.values(colors) })
        // ordena legenda (cores) de acordo com quem historicamente mais produziu
        // mas coloca "other" embaixo
        .sort({ field: 'sum_val_aggr', order: 'descending' })
        .legend(null),
      // ordena barras entre si de acordo com o rank
      vl.order().fieldQ('rank_aggr').sort('descending'),
      vl.tooltip([
        { field: 'country_or_other', type: 'nominal', title: 'País' },
        { field: 'sum_val_aggr', type: 'quantitative', title: `${serviceStr} (Gbbl)`, format: '.2f' }
      ])
    );


  const legendBars = vl.markBar()
    .name('legendBars')
    .encode(
      vl.color()
        .fieldN('country')
        .scale({ domain: Object.keys(colors), range: Object.values(colors) }),
      vl.opacity()
        .if(countrySelection, vl.value(1))
        .value(0.2) 
    );

  const legendLabels = vl.markText({
      align: 'left',
      dx: 6,
      baseline: 'middle', // verticalmente
      color: '#000'
    })
    .name('legendLabels')
    .encode(
      vl.text().fieldN('country')
  );

  const legend = vl.layer(legendBars, legendLabels)
    .data(data)
    .transform(
      vl.filter('year(datum.date) < 2026'), // ignora 2026 (dados incompletos)
      vl.calculate('year(datum.date)').as('year'), // o filtro timeInterval é sobre 'year'
      vl.filter(timeInterval),
      vl.calculate('datum.value / 1e6').as('value_gbbl'), // kbbl = 1e3 bbl = 1e-6 Gbbl
      vl.aggregate(
        vl.sum('value_gbbl').as('total_val')
      ).groupby(['country']),
      vl.window(vl.rank().as('rank'))
        .sort([{ field: 'total_val', op: 'max', order: 'descending' }]),
      vl.filter(`datum.rank <= ${numberHighlightedCountries}`)
    )
    .encode(
      vl.x()
        .fieldQ('total_val')
        .scale({ domain: [0, 100] })
        .title({
          signal: `
            isDefined(timeInterval.year) && length(timeInterval.year) > 0
              ? (length(timeInterval.year) == 1 
                  ? '${serviceStr} em ' + timeInterval.year[0] + ' (Gbbl)' 
                  : '${serviceStr} em ' + timeInterval.year[0] + '-' +
                    timeInterval.year[length(timeInterval.year) - 1] + ' (Gbbl)')
              : '${serviceStr} em 2002-2025 (Gbbl)'
          `
        }),
      vl.y()
        .fieldN('country')
        .sort({ field: 'total_val', op: 'max', order: 'descending' })
        .axis(null)
        .title('')
    );;

  const gap = 64; // espaçamento entre gráfico da esquerda e da direita
  const w1 = (width - gap) * 0.6;
  const w2 = (width - gap) * 0.2

  return vl.hconcat(
      bars.width(w1), 
      legend.width(w2)
    )
    .spacing(gap)
    .bounds("flush")
    .params(timeInterval, countrySelection)
    .render({ renderer: "svg" });
}
)}

function _convertToKbbl(){return(
(valueStr, unit) => {
  const value = parseFloat(valueStr);
  if (isNaN(value)) return null;
  switch (unit?.trim().toLowerCase()) {
    case 'tons':
      return (value * 7.33) / 1000;
    case 'cubic meters':
      return (value * 6.2898) / 1000;
    default:
      return null; 
  }
}
)}

function _dinamizeDateFromTrade(parseNumber){return(
function (data) {
    return data.flatMap(line => {
      // line = {Country: "A", Jan2002: "B", Feb2002: "C"}
      const {
        reporterCd,
        reporterLabel: exporter,
        partnerCd,
        partnerLabel: importer,
        productCd,
        productLabel,
        ...valueByDateStr
      } = line;
      // { country: "A", date: "Jan 2002", value: "B" }
      // { country: "A", date: "Feb 2002", value: "C" }
      return Object.entries(valueByDateStr).map(([dateStr, value]) => {
        const yearStr = dateStr.slice(0, 4);
        return {
          exporter: exporter,
          importer: importer,
          date: new Date(yearStr, 0),
          value: parseNumber(value)        
        }});
    });
}
)}

function _exports(FileAttachment,dinamizeDateFromTrade){return(
Promise.all(
  [
    FileAttachment("saudi-arabias-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("united-arab-emirates-exports-to-world-by-importer-mirror_2709.csv"),
    // Russia 2002-2021
    FileAttachment("russian-federations-exports-to-world-by-importer_2709.csv"),
    // Russia 2022-2025
    FileAttachment("russian-federations-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("canadas-exports-to-world-by-importer_2709.csv"),
    // Iran 2002-2023
    FileAttachment("iran-islamic-republic-ofs-exports-to-world-by-importer_2709.csv"),
    // Iran 2024-2025
    FileAttachment("iran-islamic-republic-ofs-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("iraqs-exports-to-world-by-importer-mirror_2709.csv"),
    // Nigeria 2002-2024
    FileAttachment("nigerias-exports-to-world-by-importer_2709.csv"),
    // Nigeria 2025
    FileAttachment("nigerias-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("united-states-of-americas-exports-to-world-by-importer_2709.csv"),
    FileAttachment("chinas-exports-to-world-by-importer_2709.csv"),
    FileAttachment("japans-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("indias-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("korea-republic-ofs-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("germanys-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("brazils-exports-to-world-by-importer_2709.csv"),
    FileAttachment("kuwaits-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("norways-exports-to-world-by-importer_2709.csv"),
    FileAttachment("kazakhstans-exports-to-world-by-importer_2709.csv"),
    FileAttachment("netherlands-exports-to-world-by-importer_2709.csv"),
    FileAttachment("spains-exports-to-world-by-importer_2709.csv"),
    FileAttachment("thailands-exports-to-world-by-importer_2709.csv"),
    FileAttachment("frances-exports-to-world-by-importer_2709.csv"),
    FileAttachment("singapores-exports-to-world-by-importer_2709.csv"),
    FileAttachment("united-kingdoms-exports-to-world-by-importer_2709.csv"),
    FileAttachment("italys-exports-to-world-by-importer_2709.csv"),
    FileAttachment("malaysias-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("indonesias-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("angolas-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("egypts-exports-to-world-by-importer-mirror_2709.csv")
  ]
  .map(file => file.csv().then(dinamizeDateFromTrade))
).then(data => data.flatMap(x => x))
)}

function _exporters(){return(
[
  // Europa
  "Norway",
  "United Kingdom",
  "Netherlands",
  "Germany",
  "France",
  "Spain",
  "Italy",
  // Eurásia
  "Russian Federation",
  "Kazakhstan",
  // Oriente Médio e África (OPEP / Produtores de Petróleo)
  "Iran, Islamic Republic of",
  "Iraq",
  "Kuwait",
  "Saudi Arabia",
  "United Arab Emirates",
  "Nigeria",
  // América
  "Canada",
  "United States of America",
  "Brazil",
  // Sul, Sudeste e Leste Asiático
  "India",
  "Singapore",
  "Thailand",
  "China",
  "Korea, Republic of",
  "Japan",
  // Agregado
  "World"
]
)}

function _projection(d3,width){return(
d3.geoMercator()
  .scale(150)
  .translate([width / 2, 320 / 2])
)}

function _preProjectedCentroids(countryCentroids,projection){return(
countryCentroids.map(d => {
  const [x, y] = projection([d.longitude, d.latitude]);
  return { ...d, x, y };
})
)}

function _29(countryCentroids){return(
countryCentroids
)}

function _get_threshold_expr_and_domain(){return(
(thresholds, fieldName) => {  
  let expr = `(datum.${fieldName} === null) ? 'N/A' : `;
  const N = thresholds.length;
  
  for (let i = 0; i < N; i++) {
    const val = thresholds[i];
    if (i === 0) {
      expr += `datum.${fieldName} <= ${val} ? '< ${val}' : `;
    } else {
      const prev = thresholds[i - 1];
      expr += `datum.${fieldName} <= ${val} ? '${prev} - ${val}' : `;
    }
  }
  const maxVal = thresholds[N - 1];
  expr += `'> ${maxVal}'`;

  const domain = [];
  domain.push(`< ${thresholds[0]}`);
  for (let i = 1; i < N; i++) {
    domain.push(`${thresholds[i - 1]} - ${thresholds[i]}`);
  }
  domain.push(`> ${maxVal}`);

  return { expr, domain };
}
)}

function _shorten()
{
  const shortenMap = {
      // NOME NO TRADEMAP: NOME NO HEATMAP
      "United States of America": "USA",
      "Iran, Islamic Republic of": "Iran",
      "Russian Federation": "Russia",
      "Korea, Republic of": "S. Korea",
      "United Kingdom": "UK",
      // nome de país às vezes fica diferente,
      // exemplo: "Korea, Republic of" nos dados de fluxo e "South Korea" nos dados geométricos
      // mas temos que padronizar... (para conseguir fazer 'join' nos dados)
     
      // NOME NO MAPA: NOME NO HEATMAP (tem que mapear para o mesmo nome no heatmap)
      "South Korea": "S. Korea"
  };
  return name => shortenMap[name] || name;
}


function _shortenedExporters(exporters,shorten){return(
exporters.map(shorten)
)}

function _shortenedExports(exports,shorten)
{
  return exports.map(row => ({
    ...row,
    exporter: shorten(row.exporter),
    importer: shorten(row.importer)
  }));
}


function _themeColors(){return(
{
  primaryRed: '#d62728',       // Vermelho. SELEÇÃO ATUAL (exata) no mapa.
  exporterOrange: '#ff7f0e',   // Laranja.  Exportador selecionado -> Importador
  importerBlue: '#1f77b4',     // Azul.     Exportador -> Importador selecionado
  hoverGreen: '#2ca02c',       // Verde.    HOVER ATUAL (exato)
  inactiveGray: '#eaeaea',     // Cinza neutro. (fallback! em tese, não é pra aparecer, pois filtramos...)
  gridStrokeClick: '#ff5555',  // Vermelho. Borda da CÉLULA ATUAL (exata) no heatmap.
  gridStrokeHover: '#ffaaaa',  // Vermelho claro. Borda da CÉLULA em HOVER no heatmap
  gridStrokeInactive: '#ddd'   // Cinza.    Fallback (borda do heatmap)
}
)}

function _yearSelection(vl)
{
  return vl.param('yearSelection')
    .bind({ input: 'range', min: 2002, max: 2025, step: 1, name: 'Ano' })
    .value(2024);
}


function _selectCell(vl)
{ return vl.selectPoint('selectCell').fields('exporter', 'importer') }


function _selectExporter(vl)
{ return vl.selectPoint('selectExporter').fields('exporter') }


function _selectImporter(vl)
{ return vl.selectPoint('selectImporter').fields('importer') }


function _hoverCell(vl)
{ return vl.selectPoint('hoverCell').on('mouseover').clear('mouseout').fields('exporter', 'importer') }


function _hoverExporter(vl)
{ return vl.selectPoint('hoverExporter').on('mouseover').clear('mouseout').fields('exporter') }


function _hoverImporter(vl)
{ return vl.selectPoint('hoverImporter').on('mouseover').clear('mouseout').fields('importer') }


async function _exportHeatMap(selectCell,selectExporter,selectImporter,hoverCell,hoverExporter,hoverImporter,vl,themeColors,get_threshold_expr_and_domain,shortenedExports,shortenedExporters,d3,width,countryCentroids,shorten,topojson,world,yearSelection,Event)
{

  const heatmapParams = [selectCell, selectExporter, selectImporter, hoverCell, hoverExporter, hoverImporter]
  
  const hasClick    = selectCell.empty(false);
  const hasClickExp = selectExporter.empty(false);
  const hasClickImp = selectImporter.empty(false);
  
  const hasHover    = hoverCell.empty(false);
  const hasHoverExp = hoverExporter.empty(false);
  const hasHoverImp = hoverImporter.empty(false);
  
  const activeFlows = vl.or(
    vl.and(vl.not(hasClick), hasHover),
    vl.and(hasClick, hasHover, vl.or(hasClickExp, hasClickImp)),
    vl.and(hasClickExp, vl.not(hasHoverExp)),
    vl.and(hasClickImp, vl.not(hasHoverImp))
  );
  
  // Range das setas
  const limits = {
    maxStrokeWidth: 15,          // Espessura máxima da linha do fluxo de maior valor
    minArrowSize: 20,            // Área mínima da seta (para fluxos de valor baixo)
    maxArrowSize: 800            // Área máxima da seta (para não engolir o país de destino)
  };

  // Obs.: abaixo uso função () porque o objeto vl.color() é mutado internamente... então
  // temos que pegar um objeto novo em folha sempre que quisermos reusar

  // Regra da cor da setas(usada para linha e triângulo)
  const getFlowColor = () => vl.color()
    .if(vl.and(hasClick, hasHover), vl.value(themeColors.primaryRed))
    .if(hasClick, vl.value(themeColors.primaryRed)) 
    .if(hasClickExp, vl.value(themeColors.exporterOrange))
    .if(hasClickImp, vl.value(themeColors.importerBlue))
    .if(hasHover, vl.value(themeColors.hoverGreen)) 
    .value(themeColors.inactiveGray);

  // Regra da opacidade da seta (usada para linha e triângulo)
  const getFlowOpacity = () => vl.opacity()
    .if(hasHover, vl.value(1)) 
    .if(hasClick, vl.value(0.8)) 
    .if(activeFlows, vl.value(0.2))
    .value(0);
  
  
  const thresholds = [10, 100, 1000, 10000, 100000];
  const { expr: thresholdExpr, domain: thresholdDomain } = get_threshold_expr_and_domain(thresholds, 'value_mi');
  
  const heatmap = vl.markRect()
    .data(shortenedExports)
    .params(heatmapParams)
    .transform(
      vl.filter('year(datum.date) == yearSelection'),
      vl.filter(`
        indexof(${JSON.stringify(shortenedExporters)}, datum.importer) >= 0
      `),
      // datum.value está em Thousand USD: (datum.value / 1e3) está em USD million
      vl.calculate('datum.value / 1e3').as('value_mi'),

      vl.impute('value_mi')
        .key('importer')
        .groupby(['exporter'])
        .value(null),
        
      vl.calculate(thresholdExpr).as('value_range'),
      
    )
    .encode(
      vl.y().fieldN('exporter').scale({ domain: shortenedExporters.slice(0, shortenedExporters.length - 1) }).title('Exportador'), // exceto World
      vl.x().fieldN('importer').scale({ domain: shortenedExporters }).title('Importador'),
      vl.color()
        .fieldO('value_range')
        .if('datum.exporter == datum.importer', vl.value('#ccc'))
        .scale({ 
          domain: thresholdDomain,
          range: [
            '#ffffff',
            ...d3.schemeBlues[thresholds.length]
          ]
        })
        .legend({
          orient: 'none', // Legenda fica flutuante
          legendX: -40,
          legendY: 395,
          direction: 'vertical',
          title: 'USD (milhões)',
          titleOrient: 'top',
        }),
      vl.tooltip([
        { field: 'exporter', type: 'nominal', title: 'Exportador' },
        { field: 'importer', type: 'nominal', title: 'Importador' },
        { field: 'value_mi', type: 'quantitative', format: '$.2f', title: 'USD (milhões)'}
      ]),
      vl.stroke()
        .if(hasClick, vl.value(themeColors.gridStrokeClick))
        .if(hasHover, vl.value(themeColors.gridStrokeHover))
        .if(vl.or(hasClickExp, hasClickImp), vl.value(themeColors.gridStrokeInactive))
        .value(null),
      vl.strokeWidth()
        .if(hasClick, vl.value(2))
        .if(hasHover, vl.value(2))
        .if(vl.or(hasClickExp, hasClickImp), vl.value(0.5))
        .value(0),
      vl.order()
        .if(hasClick, vl.value(3))
        .if(hasHover, vl.value(2))
        .if(vl.or(hasClickExp, hasClickImp), vl.value(1))
        .value(0)
    );

  const mapWidth = 0.4 * width;
  const mapHeight = 320;

  const proj = d3.geoEquirectangular()
    .scale(90)
    .translate([mapWidth / 2 - 120, 160]);

  const projectedCentroids = countryCentroids.map(c => {
    const [x, rawY] = proj([c.longitude, c.latitude]);
    const y = mapHeight - rawY;
    return { ...c, x, y, name: shorten(c.name) };
  });
  
  const geojson = topojson.feature(world, world.objects.countries);
  const flatMapData = [];
  
  let polyCounter = 0;
  
  geojson.features.forEach(feature => {
    if (!feature.geometry) return;
    
    const polys = feature.geometry.type === 'MultiPolygon' 
      ? feature.geometry.coordinates 
      : [feature.geometry.coordinates];
  
    polys.forEach((poly) => {
      if (!poly[0]) return;
      
      let previousX = null;
      let boundaryCrossed = false;
      const temporaryPoints = [];
  
      poly[0].forEach((coord, index) => {
        const [x, rawY] = proj(coord);
        const y = mapHeight - rawY;
        
        // se o x der um pulo maior que metade do mapa de um ponto pro outro,
        // batemos na borda do mapa (anti-meridiano 180°), então temos que pular esse pedaço
        // se não o markLine liga as duas pontas cruzando a tela inteira por cima do mapa...
        if (previousX !== null && Math.abs(x - previousX) > (mapWidth / 2)) {
          boundaryCrossed = true;
        }
        previousX = x;
  
        temporaryPoints.push({
          polyId: 'poly-' + polyCounter,
          pointIndex: index,
          x: x,
          y: y
        });
      });

      if (!boundaryCrossed) {
        flatMapData.push(...temporaryPoints);
      }
 
      polyCounter++;
    });
  });

  const mouseZoomPan = vl.selectInterval('zoomMap').bind('scales');
  const value_mi_domain = [0, 30000];

  const ocean_bg = vl.markRect({ fill: 'transparent' })
    .data([{ x: 0, y: 0, x2: mapWidth, y2: mapHeight }])
    .encode(
      vl.x().fieldQ('x').scale({ domain: [0, mapWidth] }).axis(null),
      vl.y().fieldQ('y').scale({ domain: [0, mapHeight] }).axis(null),
      vl.x2().fieldQ('x2'),
      vl.y2().fieldQ('y2')
    );

 const background_world_map = vl.markLine({fill: '#eee', stroke: '#ddd', strokeWidth: 1})
  .data(flatMapData)
  .encode(
    vl.x().fieldQ('x').scale({domain: [0, mapWidth]}).axis(null),
    vl.y().fieldQ('y').scale({domain: [mapHeight, 0]}).axis(null),
    vl.detail().fieldN('polyId'),
    vl.order().fieldQ('pointIndex')
  ); 

  const flow_lines = vl.markRule()
    .data(shortenedExports)
    .transform(
      vl.filter('year(datum.date) == yearSelection'),
      vl.filter(activeFlows),
      // datum.value está em Thousand USD: (datum.value / 1e3) está em USD million
      vl.calculate('datum.value / 1e3').as('value_mi'),
      vl.lookup('exporter').from(
          vl.data(projectedCentroids)
            .key('name')
            .fields(['x', 'y'])
        ),
      vl.lookup('importer').from(
          vl.data(projectedCentroids)
            .key('name')
            .fields(['x', 'y'])
        )
        .as('x2', 'y2'),
      // se um dos países não for encontrado na listagem de centroids,
      // o lookup retorna NaN/Null e a linha vai parar nas coordenadas (0,0) (no meio do oceano)
      // temos que limpar esses dados inválidos para evitar setas/traços cruzando o nada...
      vl.filter('isValid(datum.x) && isValid(datum.y) && isValid(datum.x2) && isValid(datum.y2)'),
    )
    .encode(
      vl.x().fieldQ('x'),
      vl.y().fieldQ('y'),
      vl.x2().fieldQ('x2'),
      vl.y2().fieldQ('y2'),
      vl.strokeWidth().fieldQ('value_mi')
        .scale({
          type: 'sqrt',
          domain: value_mi_domain,
          range: [0, limits.maxStrokeWidth],
          clamp: true
        })
        .legend(null),
      vl.color(getFlowColor()),               
      vl.opacity(getFlowOpacity()),
      vl.order()
        .if(vl.and(hasClick, hasHover), vl.value(9))
        .if(hasClick, vl.value(8)) 
        .if(vl.and(vl.not(hasClick), hasHover), vl.value(7)) 
        .if(hasClickExp, vl.value(6))
        .if(hasClickImp, vl.value(5))
        .value(1),
      vl.tooltip([
        { field: 'exporter', type: 'nominal', title: 'Exportador' },
        { field: 'importer', type: 'nominal', title: 'Importador' },
        { field: 'value_mi', type: 'quantitative', format: '$,.0f', title: 'USD (milhões)'}
      ])
    );

  const flow_arrows = vl.markPoint({
      shape: 'triangle',
      filled: true
    })
    .data(shortenedExports)
    .transform(
      vl.filter('year(datum.date) == yearSelection'),
      vl.filter(activeFlows), 
      vl.filter('datum.value > 0'),
      // datum.value está em Thousand USD: (datum.value / 1e3) está em USD million
      vl.calculate('datum.value / 1e3').as('value_mi'),
      vl.lookup('exporter').from(
          vl.data(projectedCentroids)
            .key('name')
            .fields(['x', 'y'])
        ),
      vl.lookup('importer').from(
          vl.data(projectedCentroids)
            .key('name')
            .fields(['x', 'y'])
        )
        .as('x2', 'y2'),
      vl.filter('isValid(datum.x) && isValid(datum.y) && isValid(datum.x2) && isValid(datum.y2)'),
      // Calcula o ângulo (em graus) de rotação da seta
      // O cálculo do atan2 aqui precisa de datum.y - datum.y2 na vertical
      // porque no sistema de coordenadas da tela do Vega-Lite o Y cresce para baixo, mas nos
      // nossos dados do flatMap o Y cresce para cima! Fazendo assim a seta não aponta invertida
      vl.calculate('atan2(datum.y - datum.y2, datum.x2 - datum.x) * 180 / PI + 90').as('angle')
    )
    .encode(
      vl.x().fieldQ('x2'), // Triângulo (seta) fica na coordenada do importador!
      vl.y().fieldQ('y2'), // Triângulo (seta) fica na coordenada do importador!
      vl.angle().fieldQ('angle').scale({ domain: [0, 360], range: [0, 360] }), // Rotaciona na direção do fluxo
      // O LADO do triângulo (seta) deve ser proporcional ao STROKEWIDTH do markRule()
      // Pela escala do STROKEWIDTH, é calculado como sqrt(value_mi).
      // Pegadinha: o size() do triângulo (markPoint() shape 'triangle') determina a ÁREA do triângulo
      // A área é proporcional ao quadrado (^2) do LADO do triângulo. Então fazemos a ÁREA (size()) ser
      // proporcional a value_mi (ou seja, escala linear); isso faz o LADO ser proporcional a sqrt(value_mi),
      // assim como STROKE_WIDTH!
      vl.size().fieldQ('value_mi')
        .scale({
          type: 'linear',
          domain: value_mi_domain,
          range: [limits.minArrowSize, limits.maxArrowSize], // ÁREA do triângulo
          clamp: true
        }),
      // Triângulo (seta) deve ter a mesma cor do markRule()
      vl.color(getFlowColor()),
      // Triângulo (seta), deve ter a mesma opacidade do markRule()
      vl.opacity(getFlowOpacity())
    );
  
  const world_flow_map = vl.layer(ocean_bg.params(mouseZoomPan), background_world_map, flow_arrows, flow_lines);
  const heatmapSize = 320;
  
  const chart = await vl.hconcat([
    heatmap
      .width(heatmapSize)
      .height(heatmapSize),
    world_flow_map
      .width(mapWidth)
      .height(mapHeight)
  ])
    .params(yearSelection)
    .resolve({ scale: { color: 'independent' }})
    .config({ view: { stroke: null } }) 
    .render({ renderer: 'canvas' });

  const view = chart.value;

  chart.value = view;

  view.addSignalListener("selectCell", () => {
    chart.dispatchEvent(new Event("input", { bubbles: true }));
  });
  
  return chart;
}


function _sideBars(exportHeatMap,html,shortenedExports,vl,themeColors)
{
  const cellSignal = exportHeatMap.signal("selectCell");
  const yearSignal = exportHeatMap.signal("yearSelection"); // é um int

  const emptyViz = html`<div style="width: 220px; height: 380px; box-sizing: border-box;"></div>`;

  // Se não houver seleção ativa, retorna vazio
  if (!(cellSignal && cellSignal.exporter && cellSignal.exporter.length > 0)) return emptyViz;

  const selExp = exportHeatMap.signal("selectExporter").exporter[0];
  const selImp = exportHeatMap.signal("selectImporter").importer[0];

  if (selImp == 'World') return emptyViz;

  const dataExporter = shortenedExports.filter(d => d.exporter === selExp);
  const dataImporter = shortenedExports.filter(d => d.importer === selImp);

  const exporterBar = vl.markBar()
    .data(dataExporter)
    .transform(
      vl.filter(`year(datum.date) == ${yearSignal}`),
      vl.calculate('datum.value / 1e3').as('value_mi'),
      vl.joinaggregate({ op: 'sum', field: 'value_mi', as: 'total_exports' }).groupby(['exporter']),
      vl.calculate('(datum.value_mi / datum.total_exports) * 100').as('pct'),
      
      vl.calculate(`datum.exporter == '${selExp}' && datum.importer == '${selImp}' ? 'Fluxo selecionado' : 'Outras exportações'`).as('flow_category'),
    )
    .encode(
      vl.x().fieldN('exporter').title(null).axis(null),
      vl.y().sum('pct').title('(%)').scale({ domain: [0, 100] }).axis({
        titleAngle: 0,
        titleAlign: 'left',
        titleAnchor: 'end',
        titleY: -15,
        titleX: -23
      }),
      vl.color()
        .fieldN('flow_category')
        .scale({
          domain: ['Fluxo selecionado', 'Outras exportações'],
          range: [themeColors.primaryRed, themeColors.exporterOrange]
        })
        .legend({ title: null }),
      vl.tooltip([
        { field: 'flow_category', type: 'nominal', title: 'Category' },
        { field: 'value_mi', type: 'quantitative', aggregate: 'sum', format: '$.2f', title: 'USD (million)' },
        { field: 'pct', type: 'quantitative', aggregate: 'sum', format: '.1f', title: '(%)' }
      ])
    )
    .width(45)
    .height(180);

  const importerBar = vl.markBar()
    .data(dataImporter)
    .transform(
      vl.filter(`year(datum.date) == ${yearSignal}`),
      vl.calculate('datum.value / 1e3').as('value_mi'),
      vl.joinaggregate({ op: 'sum', field: 'value_mi', as: 'total_imports' }).groupby(['importer']),
      vl.calculate('(datum.value_mi / datum.total_imports) * 100').as('pct'),
      
      vl.calculate(`datum.exporter == '${selExp}' && datum.importer == '${selImp}' ? 'Fluxo selecionado' : 'Outras importações'`).as('flow_category')
    )
    .encode(
      vl.x().fieldN('importer').title(null).axis(null),
      vl.y().sum('pct').title(null).scale({ domain: [0, 100] }), 
      vl.color()
        .fieldN('flow_category')
        .scale({
          domain: ['Fluxo selecionado', 'Outras importações'],
          range: [themeColors.primaryRed, themeColors.importerBlue]
        })
        .legend({ title: null }),
      vl.tooltip([
        { field: 'flow_category', type: 'nominal', title: 'Category' },
        { field: 'value_mi', type: 'quantitative', aggregate: 'sum', format: '$.2f', title: 'USD (million)' },
        { field: 'pct', type: 'quantitative', aggregate: 'sum', format: '.1f', title: '(%)' }
      ])
    )
    .width(45)
    .height(180);
  
  const bars = vl.vconcat([exporterBar, importerBar])
    .spacing(20)
    .resolve({ scale: { color: 'independent' } });

  return bars.render();
}


function _dinamizeDateFromTrade2(convertToKbbl){return(
function (data) {
  const parsedPartners = [];

  // exclude World
  data.forEach(line => {
    const {
      reporterLabel: exporter,
      partnerLabel: importer,
    } = line;

    if (importer.toLowerCase() === 'world') {
      return;
    }

    // Find 2002, 2003, ...
    const years = Object.keys(line).filter(key => /^\d{4}$/.test(key));

    years.forEach(yearStr => {
      const rawValue = line[yearStr];
      const unit = line[`${yearStr}_unit`];
      const convertedValue = convertToKbbl(rawValue, unit);

      parsedPartners.push({
        exporter: exporter,
        importer: importer,
        dateStr: yearStr, // will be converted later to actual date object
        value: convertedValue
      });
    });
  });

  // computo World manualmente, porque a unidade nos dados para World não é nem 'Tons' nem 'Cubic meters', é 'Mixed'... horrível
  const worldAggregates = {};

  parsedPartners.forEach(item => {
    const groupKey = `${item.exporter}||${item.dateStr}`;

    if (!worldAggregates[groupKey]) {
      worldAggregates[groupKey] = {
        exporter: item.exporter,
        importer: "World",
        dateStr: item.dateStr,
        sum: 0,
        hasValidData: false
      };
    }

    if (item.value !== null) {
      worldAggregates[groupKey].sum += item.value;
      worldAggregates[groupKey].hasValidData = true;
    }
  });

  const finalPartners = parsedPartners.map(item => ({
    exporter: item.exporter,
    importer: item.importer,
    date: new Date(item.dateStr, 0), // agora sim para data
    value: item.value
  }));

  const finalWorld = Object.values(worldAggregates).map(item => ({
    exporter: item.exporter,
    importer: item.importer,
    date: new Date(item.dateStr, 0),
    value: item.hasValidData ? item.sum : null
  }));

  return [...finalPartners, ...finalWorld];
}
)}

function _exports2(FileAttachment,dinamizeDateFromTrade2){return(
Promise.all(
  [
    FileAttachment("2-saudi-arabias-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("2-united-arab-emirates-exports-to-world-by-importer-mirror_2709.csv"),
    // Russia 2002-2021
    FileAttachment("2-russian-federations-exports-to-world-by-importer_2709.csv"),
    // Russia 2022-2025
    FileAttachment("2-russian-federations-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("2-canadas-exports-to-world-by-importer_2709.csv"),
    // Iran 2002-2023
    FileAttachment("2-iran-islamic-republic-ofs-exports-to-world-by-importer_2709.csv"),
    // Iran 2024-2025
    FileAttachment("2-iran-islamic-republic-ofs-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("2-iraqs-exports-to-world-by-importer-mirror_2709.csv"),
    // Nigeria 2002-2024
    FileAttachment("2-nigerias-exports-to-world-by-importer_2709.csv"),
    // Nigeria 2025
    FileAttachment("2-nigerias-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("2-united-states-of-americas-exports-to-world-by-importer_2709.csv"),
    FileAttachment("2-chinas-exports-to-world-by-importer_2709.csv"),
    FileAttachment("2-japans-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("2-indias-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("2-korea-republic-ofs-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("2-germanys-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("2-brazils-exports-to-world-by-importer_2709.csv"),
    FileAttachment("2-kuwaits-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("2-norways-exports-to-world-by-importer_2709.csv"),
    FileAttachment("2-kazakhstans-exports-to-world-by-importer_2709.csv"),
    FileAttachment("2-netherlands-exports-to-world-by-importer_2709.csv"),
    FileAttachment("2-spains-exports-to-world-by-importer_2709.csv"),
    FileAttachment("2-thailands-exports-to-world-by-importer_2709.csv"),
    FileAttachment("2-frances-exports-to-world-by-importer_2709.csv"),
    FileAttachment("2-singapores-exports-to-world-by-importer_2709.csv"),
    FileAttachment("2-united-kingdoms-exports-to-world-by-importer_2709.csv"),
    FileAttachment("2-italys-exports-to-world-by-importer_2709.csv"),
    FileAttachment("2-malaysias-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("2-indonesias-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("2-angolas-exports-to-world-by-importer-mirror_2709.csv"),
    FileAttachment("2-egypts-exports-to-world-by-importer-mirror_2709.csv")
  ]
  .map(file => file.csv().then(dinamizeDateFromTrade2))
).then(data => data.flatMap(x => x))
)}

function _shortenedExports2(exports2,shorten)
{
  return exports2.map(row => ({
    ...row,
    exporter: shorten(row.exporter),
    importer: shorten(row.importer)
  }));
}


async function _exportHeatMap2(selectCell,selectExporter,selectImporter,hoverCell,hoverExporter,hoverImporter,vl,themeColors,get_threshold_expr_and_domain,shortenedExports2,shortenedExporters,d3,width,countryCentroids,shorten,topojson,world,yearSelection,Event)
{

  const heatmapParams = [selectCell, selectExporter, selectImporter, hoverCell, hoverExporter, hoverImporter]
  
  const hasClick    = selectCell.empty(false);
  const hasClickExp = selectExporter.empty(false);
  const hasClickImp = selectImporter.empty(false);
  
  const hasHover    = hoverCell.empty(false);
  const hasHoverExp = hoverExporter.empty(false);
  const hasHoverImp = hoverImporter.empty(false);
  
  const activeFlows = vl.or(
    vl.and(vl.not(hasClick), hasHover),
    vl.and(hasClick, hasHover, vl.or(hasClickExp, hasClickImp)),
    vl.and(hasClickExp, vl.not(hasHoverExp)),
    vl.and(hasClickImp, vl.not(hasHoverImp))
  );
  
  // Range das setas
  const limits = {
    maxStrokeWidth: 15,          // Espessura máxima da linha do fluxo de maior valor
    minArrowSize: 20,            // Área mínima da seta (para fluxos de valor baixo)
    maxArrowSize: 800            // Área máxima da seta (para não engolir o país de destino)
  };

  // Obs.: abaixo uso função () porque o objeto vl.color() é mutado internamente... então
  // temos que pegar um objeto novo em folha sempre que quisermos reusar

  // Regra da cor da setas(usada para linha e triângulo)
  const getFlowColor = () => vl.color()
    .if(vl.and(hasClick, hasHover), vl.value(themeColors.primaryRed))
    .if(hasClick, vl.value(themeColors.primaryRed)) 
    .if(hasClickExp, vl.value(themeColors.exporterOrange))
    .if(hasClickImp, vl.value(themeColors.importerBlue))
    .if(hasHover, vl.value(themeColors.hoverGreen)) 
    .value(themeColors.inactiveGray);

  // Regra da opacidade da seta (usada para linha e triângulo)
  const getFlowOpacity = () => vl.opacity()
    .if(hasHover, vl.value(1)) 
    .if(hasClick, vl.value(0.8)) 
    .if(activeFlows, vl.value(0.2))
    .value(0);
  
  
  const thresholds = [0.01, 0.1, 1, 10, 100, 1000];
  const { expr: thresholdExpr, domain: thresholdDomain } = get_threshold_expr_and_domain(thresholds, 'value_mi');
  
  const heatmap = vl.markRect()
    .data(shortenedExports2)
    .params(heatmapParams)
    .transform(
      vl.filter('year(datum.date) == yearSelection'),
      vl.filter(`
        indexof(${JSON.stringify(shortenedExporters)}, datum.importer) >= 0
      `),
      // datum.value está em kbbl: (datum.value / 1e3) está em Mbbl
      vl.calculate('datum.value / 1e3').as('value_mi'),

      vl.impute('value_mi')
        .key('importer')
        .groupby(['exporter'])
        .value(null),
        
      vl.calculate(thresholdExpr).as('value_range'),
      
    )
    .encode(
      vl.y().fieldN('exporter').scale({ domain: shortenedExporters.slice(0, shortenedExporters.length - 1) }).title('Exportador'), // exceto World
      vl.x().fieldN('importer').scale({ domain: shortenedExporters }).title('Importador'),
      vl.color()
        .fieldO('value_range')
        .if('datum.exporter == datum.importer', vl.value('#ccc'))
        .scale({ 
          domain: thresholdDomain,
          range: [
            '#ffffff',
            ...d3.schemeBlues[thresholds.length]
          ]
        })
        .legend({
          orient: 'none', // Legenda fica flutuante
          legendX: -40,
          legendY: 395,
          direction: 'vertical',
          title: 'Mbbl',
          titleOrient: 'top',
        }),
      vl.tooltip([
        { field: 'exporter', type: 'nominal', title: 'Exportador' },
        { field: 'importer', type: 'nominal', title: 'Importador' },
        { field: 'value_mi', type: 'quantitative', format: '.2f', title: 'Mbbl'}
      ]),
      vl.stroke()
        .if(hasClick, vl.value(themeColors.gridStrokeClick))
        .if(hasHover, vl.value(themeColors.gridStrokeHover))
        .if(vl.or(hasClickExp, hasClickImp), vl.value(themeColors.gridStrokeInactive))
        .value(null),
      vl.strokeWidth()
        .if(hasClick, vl.value(2))
        .if(hasHover, vl.value(2))
        .if(vl.or(hasClickExp, hasClickImp), vl.value(0.5))
        .value(0),
      vl.order()
        .if(hasClick, vl.value(3))
        .if(hasHover, vl.value(2))
        .if(vl.or(hasClickExp, hasClickImp), vl.value(1))
        .value(0)
    );

  const mapWidth = 0.4 * width;
  const mapHeight = 320;

  const proj = d3.geoEquirectangular()
    .scale(90)
    .translate([mapWidth / 2 - 120, 160]);

  const projectedCentroids = countryCentroids.map(c => {
    const [x, rawY] = proj([c.longitude, c.latitude]);
    const y = mapHeight - rawY;
    return { ...c, x, y, name: shorten(c.name) };
  });
  
  const geojson = topojson.feature(world, world.objects.countries);
  const flatMapData = [];
  
  let polyCounter = 0;
  
  geojson.features.forEach(feature => {
    if (!feature.geometry) return;
    
    const polys = feature.geometry.type === 'MultiPolygon' 
      ? feature.geometry.coordinates 
      : [feature.geometry.coordinates];
  
    polys.forEach((poly) => {
      if (!poly[0]) return;
      
      let previousX = null;
      let boundaryCrossed = false;
      const temporaryPoints = [];
  
      poly[0].forEach((coord, index) => {
        const [x, rawY] = proj(coord);
        const y = mapHeight - rawY;
        
        // se o x der um pulo maior que metade do mapa de um ponto pro outro,
        // batemos na borda do mapa (anti-meridiano 180°), então temos que pular esse pedaço
        // se não o markLine liga as duas pontas cruzando a tela inteira por cima do mapa...
        if (previousX !== null && Math.abs(x - previousX) > (mapWidth / 2)) {
          boundaryCrossed = true;
        }
        previousX = x;
  
        temporaryPoints.push({
          polyId: 'poly-' + polyCounter,
          pointIndex: index,
          x: x,
          y: y
        });
      });

      if (!boundaryCrossed) {
        flatMapData.push(...temporaryPoints);
      }
 
      polyCounter++;
    });
  });

  const mouseZoomPan = vl.selectInterval('zoomMap').bind('scales');
  const value_mi_domain = [0, 100];

  const ocean_bg = vl.markRect({ fill: 'transparent' })
    .data([{ x: 0, y: 0, x2: mapWidth, y2: mapHeight }])
    .encode(
      vl.x().fieldQ('x').scale({ domain: [0, mapWidth] }).axis(null),
      vl.y().fieldQ('y').scale({ domain: [0, mapHeight] }).axis(null),
      vl.x2().fieldQ('x2'),
      vl.y2().fieldQ('y2')
    );

 const background_world_map = vl.markLine({fill: '#eee', stroke: '#ddd', strokeWidth: 1})
  .data(flatMapData)
  .encode(
    vl.x().fieldQ('x').scale({domain: [0, mapWidth]}).axis(null),
    vl.y().fieldQ('y').scale({domain: [mapHeight, 0]}).axis(null),
    vl.detail().fieldN('polyId'),
    vl.order().fieldQ('pointIndex')
  ); 

  const flow_lines = vl.markRule()
    .data(shortenedExports2)
    .transform(
      vl.filter('year(datum.date) == yearSelection'),
      vl.filter(activeFlows),
      // datum.value está em kbbl: (datum.value / 1e3) está em Mbbl
      vl.calculate('datum.value / 1e3').as('value_mi'),
      vl.lookup('exporter').from(
          vl.data(projectedCentroids)
            .key('name')
            .fields(['x', 'y'])
        ),
      vl.lookup('importer').from(
          vl.data(projectedCentroids)
            .key('name')
            .fields(['x', 'y'])
        )
        .as('x2', 'y2'),
      // se um dos países não for encontrado na listagem de centroids,
      // o lookup retorna NaN/Null e a linha vai parar nas coordenadas (0,0) (no meio do oceano)
      // temos que limpar esses dados inválidos para evitar setas/traços cruzando o nada...
      vl.filter('isValid(datum.x) && isValid(datum.y) && isValid(datum.x2) && isValid(datum.y2)'),
    )
    .encode(
      vl.x().fieldQ('x'),
      vl.y().fieldQ('y'),
      vl.x2().fieldQ('x2'),
      vl.y2().fieldQ('y2'),
      vl.strokeWidth().fieldQ('value_mi')
        .scale({
          type: 'sqrt',
          domain: value_mi_domain,
          range: [0, limits.maxStrokeWidth],
          clamp: true
        })
        .legend(null),
      vl.color(getFlowColor()),               
      vl.opacity(getFlowOpacity()),
      vl.order()
        .if(vl.and(hasClick, hasHover), vl.value(9))
        .if(hasClick, vl.value(8)) 
        .if(vl.and(vl.not(hasClick), hasHover), vl.value(7)) 
        .if(hasClickExp, vl.value(6))
        .if(hasClickImp, vl.value(5))
        .value(1),
      vl.tooltip([
        { field: 'exporter', type: 'nominal', title: 'Exportador' },
        { field: 'importer', type: 'nominal', title: 'Importador' },
        { field: 'value_mi', type: 'quantitative', format: '.2f', title: 'Mbbl'}
      ])
    );

  const flow_arrows = vl.markPoint({
      shape: 'triangle',
      filled: true
    })
    .data(shortenedExports2)
    .transform(
      vl.filter('year(datum.date) == yearSelection'),
      vl.filter(activeFlows), 
      vl.filter('datum.value > 0'),
      // datum.value está em Thousand USD: (datum.value / 1e3) está em USD million
      vl.calculate('datum.value / 1e3').as('value_mi'),
      vl.lookup('exporter').from(
          vl.data(projectedCentroids)
            .key('name')
            .fields(['x', 'y'])
        ),
      vl.lookup('importer').from(
          vl.data(projectedCentroids)
            .key('name')
            .fields(['x', 'y'])
        )
        .as('x2', 'y2'),
      vl.filter('isValid(datum.x) && isValid(datum.y) && isValid(datum.x2) && isValid(datum.y2)'),
      // Calcula o ângulo (em graus) de rotação da seta
      // O cálculo do atan2 aqui precisa de datum.y - datum.y2 na vertical
      // porque no sistema de coordenadas da tela do Vega-Lite o Y cresce para baixo, mas nos
      // nossos dados do flatMap o Y cresce para cima! Fazendo assim a seta não aponta invertida
      vl.calculate('atan2(datum.y - datum.y2, datum.x2 - datum.x) * 180 / PI + 90').as('angle')
    )
    .encode(
      vl.x().fieldQ('x2'), // Triângulo (seta) fica na coordenada do importador!
      vl.y().fieldQ('y2'), // Triângulo (seta) fica na coordenada do importador!
      vl.angle().fieldQ('angle').scale({ domain: [0, 360], range: [0, 360] }), // Rotaciona na direção do fluxo
      // O LADO do triângulo (seta) deve ser proporcional ao STROKEWIDTH do markRule()
      // Pela escala do STROKEWIDTH, é calculado como sqrt(value_mi).
      // Pegadinha: o size() do triângulo (markPoint() shape 'triangle') determina a ÁREA do triângulo
      // A área é proporcional ao quadrado (^2) do LADO do triângulo. Então fazemos a ÁREA (size()) ser
      // proporcional a value_mi (ou seja, escala linear); isso faz o LADO ser proporcional a sqrt(value_mi),
      // assim como STROKE_WIDTH!
      vl.size().fieldQ('value_mi')
        .scale({
          type: 'linear',
          domain: value_mi_domain,
          range: [limits.minArrowSize, limits.maxArrowSize], // ÁREA do triângulo
          clamp: true
        }),
      // Triângulo (seta) deve ter a mesma cor do markRule()
      vl.color(getFlowColor()),
      // Triângulo (seta), deve ter a mesma opacidade do markRule()
      vl.opacity(getFlowOpacity())
    );
  
  const world_flow_map = vl.layer(ocean_bg.params(mouseZoomPan), background_world_map, flow_arrows, flow_lines);
  const heatmapSize = 320;
  
  const chart = await vl.hconcat([
    heatmap
      .width(heatmapSize)
      .height(heatmapSize),
    world_flow_map
      .width(mapWidth)
      .height(mapHeight)
  ])
    .params(yearSelection)
    .resolve({ scale: { color: 'independent' }})
    .config({ view: { stroke: null } }) 
    .render({ renderer: 'canvas' });

  const view = chart.value;

  chart.value = view;

  view.addSignalListener("selectCell", () => {
    chart.dispatchEvent(new Event("input", { bubbles: true }));
  });
  
  return chart;
}


function _sideBars2(exportHeatMap2,html,shortenedExports2,vl,themeColors)
{
  const cellSignal = exportHeatMap2.signal("selectCell");
  const yearSignal = exportHeatMap2.signal("yearSelection"); // é um int

  const emptyViz = html`<div style="width: 220px; height: 380px; box-sizing: border-box;"></div>`;

  // Se não houver seleção ativa, retorna vazio
  if (!(cellSignal && cellSignal.exporter && cellSignal.exporter.length > 0)) return emptyViz;

  const selExp = exportHeatMap2.signal("selectExporter").exporter[0];
  const selImp = exportHeatMap2.signal("selectImporter").importer[0];

  if (selImp == 'World') return emptyViz;

  const dataExporter = shortenedExports2.filter(d => d.exporter === selExp);
  const dataImporter = shortenedExports2.filter(d => d.importer === selImp);

  const exporterBar = vl.markBar()
    .data(dataExporter)
    .transform(
      vl.filter(`year(datum.date) == ${yearSignal}`),
      vl.calculate('datum.value / 1e3').as('value_mi'),
      vl.joinaggregate({ op: 'sum', field: 'value_mi', as: 'total_exports' }).groupby(['exporter']),
      vl.calculate('(datum.value_mi / datum.total_exports) * 100').as('pct'),
      
      vl.calculate(`datum.exporter == '${selExp}' && datum.importer == '${selImp}' ? 'Fluxo selecionado' : 'Outras exportações'`).as('flow_category'),
    )
    .encode(
      vl.x().fieldN('exporter').title(null).axis(null),
      vl.y().sum('pct').title('(%)').scale({ domain: [0, 100] }).axis({
        titleAngle: 0,
        titleAlign: 'left',
        titleAnchor: 'end',
        titleY: -15,
        titleX: -23
      }),
      vl.color()
        .fieldN('flow_category')
        .scale({
          domain: ['Fluxo selecionado', 'Outras exportações'],
          range: [themeColors.primaryRed, themeColors.exporterOrange]
        })
        .legend({ title: null }),
      vl.tooltip([
        { field: 'flow_category', type: 'nominal', title: 'Category' },
        { field: 'value_mi', type: 'quantitative', aggregate: 'sum', format: '.2f', title: 'Mbbl' },
        { field: 'pct', type: 'quantitative', aggregate: 'sum', format: '.1f', title: '(%)' }
      ])
    )
    .width(45)
    .height(180);

  const importerBar = vl.markBar()
    .data(dataImporter)
    .transform(
      vl.filter(`year(datum.date) == ${yearSignal}`),
      vl.calculate('datum.value / 1e3').as('value_mi'),
      vl.joinaggregate({ op: 'sum', field: 'value_mi', as: 'total_imports' }).groupby(['importer']),
      vl.calculate('(datum.value_mi / datum.total_imports) * 100').as('pct'),
      
      vl.calculate(`datum.exporter == '${selExp}' && datum.importer == '${selImp}' ? 'Fluxo selecionado' : 'Outras importações'`).as('flow_category')
    )
    .encode(
      vl.x().fieldN('importer').title(null).axis(null),
      vl.y().sum('pct').title(null).scale({ domain: [0, 100] }), 
      vl.color()
        .fieldN('flow_category')
        .scale({
          domain: ['Fluxo selecionado', 'Outras importações'],
          range: [themeColors.primaryRed, themeColors.importerBlue]
        })
        .legend({ title: null }),
      vl.tooltip([
        { field: 'flow_category', type: 'nominal', title: 'Category' },
        { field: 'value_mi', type: 'quantitative', aggregate: 'sum', format: '.2f', title: 'Mbbl' },
        { field: 'pct', type: 'quantitative', aggregate: 'sum', format: '.1f', title: '(%)' }
      ])
    )
    .width(45)
    .height(180);
  
  const bars = vl.vconcat([exporterBar, importerBar])
    .spacing(20)
    .resolve({ scale: { color: 'independent' } });

  return bars.render();
}


function _kbblTotalDemandOutput(FileAttachment,dinamizeDate){return(
Promise.all([
    FileAttachment("kbbl-total-demand.csv"),
    FileAttachment("kbbl-total-output.csv")
  ].map(file => file.csv().then(dinamizeDate))
).then(([demand, output]) => {
    const outputMap = new Map();
    for (const row of output) {
      const key = `${row.country}_${row.date}`;
      outputMap.set(key, row.value);
    }
    return demand.map(d => {
      const key = `${d.country}_${d.date}`;
      const rawOutput = outputMap.get(key);
      
      const parsedDemand = Number(d.value);
      const parsedOutput = Number(rawOutput);

      return {
        country: d.country,
        date: d.date,
        demand: isNaN(parsedDemand) ? 0 : parsedDemand,
        output: isNaN(parsedOutput) ? 0 : parsedOutput
      };
    });
})
)}

function _demandVersusOutput(vl,kbblTotalDemandOutput)
{
  const min_abs_balance_threshold = 100; // países com balança comercial menor em módulo serão escondidos

  const yearSelection = vl.param('yearSelection')
    .bind({ input: 'range', min: 2002, max: 2025, step: 1, name: 'Ano' })
    .value(2024);

  const hoverSelection = vl.selectPoint('hoverSelection').on('mouseover').clear('mouseout').fields('country');
  const clickSelection = vl.selectPoint('clickSelection').on('click').fields('country');

  const bars = vl.markBar()
    .data(kbblTotalDemandOutput)
    .params(hoverSelection, clickSelection)
    .transform(
      vl.filter('year(datum.date) == yearSelection'),
      vl.calculate('datum.output - datum.demand').as('balance'),
      vl.groupby('country').aggregate(
        vl.sum('balance').as('tot_balance'),
        vl.sum('output').as('tot_output'),
        vl.sum('demand').as('tot_demand')
      ),
      vl.calculate('datum.tot_balance / 1000').as('mi_balance'),
      vl.calculate('datum.tot_output / 1000').as('mi_output'),
      vl.calculate('datum.tot_demand / 1000').as('mi_demand'),
      vl.filter(`datum.mi_balance > ${min_abs_balance_threshold} || datum.mi_balance < -${min_abs_balance_threshold}`)
    )
    .encode(
      vl.y().fieldN('country').sort({ field: 'mi_balance', op: 'sum', order: 'ascending' }).title(null),
      vl.x().fieldQ('mi_balance')
        .scale({ domain: [-2500, 2500] })
        .title('Produção - Demanda (Mbbl)'),
      vl.color()
        .if('datum.mi_balance < 0', vl.value('#d7191c'))
        .value('#2c7bb6'),
      vl.opacity()
        .if(clickSelection.empty(true), vl.value(1))
        .value(0.1),
      vl.tooltip([
        { field: 'country', type: 'nominal', title: 'País' },
        { field: 'mi_output', type: 'quantitative', format: '', title: 'Produção (Mbbl)' },
        { field: 'mi_demand', type: 'quantitative', title: 'Demanda (Mbbl)' },
        { field: 'mi_balance', type: 'quantitative', title: 'Diferença (Mbbl)' },
      ])
    )

    const xyDomain = [0, 9000];

    const points = vl.markPoint({ size: 100 })
    .transform(
      vl.calculate('(datum.tot_output - datum.tot_demand) / 1000').as('mi_balance')
    )
    .encode(
      vl.y().fieldQ('mi_output').scale({ domain: xyDomain, type: 'sqrt' }).title('Produção (Mbbl)'),
      vl.x().fieldQ('mi_demand').scale({ domain: xyDomain, type: 'sqrt' }).title('Demanda (Mbbl)'),
      vl.color()
        .if('datum.mi_output < datum.mi_demand', vl.value('#d7191c'))
        .value('#2c7bb6'),
      vl.opacity()
        .if(vl.and(hoverSelection.empty(true), clickSelection.empty(true)), vl.value(1))
        .if(vl.or(hoverSelection.empty(false), clickSelection.empty(false)), vl.value(1))
        .value(0.05),
      vl.tooltip([
        { field: 'country', type: 'nominal', title: 'País' },
        { field: 'mi_output', type: 'quantitative', format: '', title: 'Produção (Mbbl)' },
        { field: 'mi_demand', type: 'quantitative', title: 'Demanda (Mbbl)' },
        { field: 'mi_balance', type: 'quantitative', title: 'Diferença (Mbbl)' },
      ])
    )

    const diagonalLine = vl.markLine({
      color: 'gray',
      strokeDash: [4, 4], // ---
      opacity: 0.6
    })
    .data([
      { val: xyDomain[0] }, // Ponto inicial
      { val: xyDomain[1] }  // Ponto final
    ])
    .encode(
      vl.x().fieldQ('val'),
      vl.y().fieldQ('val')
    );

  const scatterplot = vl.layer(points, diagonalLine)
    .data(kbblTotalDemandOutput)
    .transform(
      vl.filter('year(datum.date) == yearSelection'),
      vl.groupby('country').aggregate(
        vl.sum('output').as('tot_output'),
        vl.sum('demand').as('tot_demand')
      ),
      vl.calculate('datum.tot_output / 1000').as('mi_output'),
      vl.calculate('datum.tot_demand / 1000').as('mi_demand')
    )
    .width(500)
    .height(500);

  const chart = vl.hconcat(bars, scatterplot)
      .params(yearSelection);

  return chart.render({ renderer: "svg" })
}


function _kbblCrudeoilStockchangeData(FileAttachment,dinamizeDate){return(
FileAttachment("kbbl-crudeoil-stockchange.csv")
  .csv()
  .then(dinamizeDate)
)}

function _kbblCrudeoilClosingStocks(FileAttachment,dinamizeDate){return(
FileAttachment("kbbl-crudeoil-closingstocks.csv")
  .csv()
  .then(dinamizeDate)
)}

function _selectedCountry(Inputs,kbblCrudeoilStockchangeData){return(
Inputs.select(
  Array.from(new Set(kbblCrudeoilStockchangeData.map(d => d.country))).sort(),
  { label: "País", value: "Brazil" }
)
)}

function _stockdiffBarChart(kbblCrudeoilStockchangeData,selectedCountry,kbblCrudeoilClosingStocks,vl,width)
{
  // 1. Criação de chaves robustas (Ano-Mês) para evitar problemas de fuso horário no cruzamento
  const getYearMonthKey = (date) => {
    if (!date) return '';
    const d = new Date(date);
    // Usa UTC para evitar variações de fuso horário local do navegador
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
  };

  const filteredStockchange = kbblCrudeoilStockchangeData.filter(d => d.country === selectedCountry);
  const filteredClosing = kbblCrudeoilClosingStocks.filter(d => d.country === selectedCountry);

  // 2. Indexação rápida O(N) para o fechamento de estoque
  const closingMap = new Map(
    filteredClosing.map(c => [getYearMonthKey(c.date), c.value])
  );

  // 3. Cruzamento dos dados
  const mergedData = filteredStockchange.map(change => {
    const key = getYearMonthKey(change.date);
    return {
      country: change.country,
      date: change.date,
      stock_change: change.value,
      closing_stock: closingMap.has(key) ? closingMap.get(key) : null
    };
  });

  // 4. Escala de cores unificada
  const colorScale = {
    domain: ['Aumento (Barras)', 'Redução (Barras)', 'Estoque Total (Linha)'],
    range: ['#26A69A', '#EF5350', '#222']
  };
  
  // Marcação das Barras (Variação)
  const bars = vl.markBar()
    .data(mergedData)
    .transform(
      vl.calculate('datum.stock_change < 0 ? "Redução (Barras)" : "Aumento (Barras)"').as('legenda')
    )
    .encode(
      vl.x().fieldT('date').timeUnit('yearmonth').axis({ format: '%Y', tickCount: 10 }).title(''),
      vl.y().fieldQ('stock_change').title(''),
      vl.color()
        .fieldN('legenda')
        .scale(colorScale)
        .title('Legenda')
    );

  // Marcação da Linha (Estoque Total)
  const line = vl.markLine()
    .data(mergedData)
    .transform(
      vl.calculate('"Estoque Total (Linha)"').as('legenda')
    ) 
    .encode(
      vl.x().fieldT('date').timeUnit('yearmonth').axis({ format: '%Y', tickCount: 10 }).title(''),
      vl.y().fieldQ('closing_stock').title('Petróleo bruto (kbbl)'),
      vl.color()
        .fieldN('legenda')
        .scale(colorScale)
    );

  // Seleção baseada em hover nas coordenadas de data (usando yearmonth para alinhar)
  const hoverSelection = vl.selectPoint('hoverSelection')
    .on('mousemove')
    .fields('date')
    .nearest(false) // Desativado para usar a área das faixas interativas
    .clear('mouseout');

  // Camada invisível para captura de interações (Tooltips de forma estável)
  const interactiveRects = vl.markRect({
      opacity: 0.001 // Invisível ao usuário, mas detectável pelo mouse
    })
    .data(mergedData)
    .params(hoverSelection)
    .encode(
      vl.x().fieldT('date').timeUnit('yearmonth'),
      vl.tooltip([
        { field: 'date', type: 'temporal', timeUnit: 'yearmonth', title: 'Data' },
        { field: 'stock_change', type: 'quantitative', format: ',.0f', title: 'Variação (kbbl)' },
        { field: 'closing_stock', type: 'quantitative', format: ',.0f', title: 'Estoque Total (kbbl)' }
      ])
    );

  // Linha guia vertical (Régua de auxílio visual)
  const interactiveRule = vl.markRule({
      color: '#bbb',
      strokeWidth: 1.5,
      strokeDash: [3, 3]
    })
    .data(mergedData)
    .transform(
      vl.filter(vl.and(hoverSelection, hoverSelection.empty(false))) 
    )
    .encode(
      vl.x().fieldT('date').timeUnit('yearmonth'),
      vl.opacity().value(0.8)
    );
    
  // Montagem final do gráfico em camadas
  const chart = vl.layer(bars, line, interactiveRule, interactiveRects)
    .width(0.6 * width)
    .title(`Evolução do estoque de petróleo bruto — ${selectedCountry}`);

  return chart.render();
}


function _copyrightNotice(){return(
['Fonte dos preços: International Monetary Fund, Global price of Brent Crude [POILBREUSDM], retrieved', 'from FRED, Federal Reserve Bank of St. Louis; https://fred.stlouisfed.org/series/POILBREUSDM, July 2, 2026.']
)}

function _poilbreusdm(__query,FileAttachment,invalidation){return(
__query(FileAttachment("POILBREUSDM.csv"),{from:{table:"POILBREUSDM"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _lineGraph(poilbreusdm,kbblCrudeoilProduction,vl,copyrightNotice)
{
  const colorProduction = '#000'; // preto
  const colorPrice = '#0f67a4'; // azul

  // Preços (2002-2023)
  const priceMap = {};
  poilbreusdm.forEach(d => {
    const year = d.observation_date.getFullYear();
    if (year >= 2002 && year <= 2023) {
      if (!priceMap[year]) priceMap[year] = [];
      priceMap[year].push(d.POILBREUSDM);
    }
  });
  const avgPriceByYear = Object.entries(priceMap).map(([year, values]) => ({
    year: Number(year),
    avg_price: values.reduce((sum, val) => sum + val, 0) / values.length
  }));

  // Produção (2002-2023)
  const prodMap = {};
  kbblCrudeoilProduction.forEach(d => {
    const year = d.date.getFullYear();
    if (year >= 2002 && year <= 2023) {
      if (!prodMap[year]) prodMap[year] = 0;
      prodMap[year] += d.value / 1e6; // kbbl --> Gbbl
    }
  });
  const sumProdByYear = Object.entries(prodMap).map(([year, value]) => ({
    year: Number(year),
    total_prod: value
  }));

  // { date, avg_price, total_prod }
  const mergedLineData = avgPriceByYear.map(p => {
    const prodRecord = sumProdByYear.find(pr => pr.year === p.year);
    return {
      date: new Date(p.year, 0, 1), // 1º de janeiro
      avg_price: p.avg_price,
      total_prod: prodRecord ? prodRecord.total_prod : 0
    };
  }).sort((a, b) => a.date - b.date);

  // Preços (linha)
  const priceLine = vl.markLine({ color: colorPrice })
    .data(mergedLineData)
    .encode(
      vl.x().fieldT('date').timeUnit('year').title('Ano'),
      vl.y().fieldQ('avg_price')
        .title('Preço médio (dólar)')
        .axis({
          orient: 'left',         
          titleColor: colorPrice, 
          labelColor: colorPrice, 
          tickColor: colorPrice, 
          grid: false 
        })
    );
  
  // Preços (pontos)
  const points = vl.markPoint({ size: 60, filled: true, color: colorPrice })
    .data(mergedLineData)
    .encode(
      vl.x().fieldT('date').timeUnit('year').title('Ano'),
      vl.y().fieldQ('avg_price').axis(null)
    );

  // Produção (Linha)
  const productionLine = vl.markLine({ size: 3, color: colorProduction })
    .data(mergedLineData)
    .encode(
      vl.x().fieldT('date').timeUnit('year').title(null),
      vl.y().fieldQ('total_prod')
        .title('Produção Mundial (Gbbl)')
        .axis({
          orient: 'right', 
          titleColor: colorProduction,
          labelColor: colorProduction,
          tickColor: colorProduction 
        })
    );
  const hoverSelection = vl.selectPoint('hoverSelection')
    .on('mousemove')
    .nearest(true)
    .encodings('x')
    .clear('mouseout');

  // Faixas verticais (inativas)
  const interactivePoints = vl.markPoint({ opacity: 0, size: 100 })
    .data(mergedLineData)
    .params(hoverSelection)
    .encode(
      vl.x().fieldT('date').timeUnit('year'),
      vl.y().fieldQ('avg_price').axis(null), // Alinha verticalmente com a linha de preços
      vl.tooltip([
        { field: 'date', type: 'temporal', timeUnit: 'year', title: 'Ano' },
        { field: 'avg_price', type: 'quantitative', format: '$.2f', title: 'Preço médio (USD)' },
        { field: 'total_prod', type: 'quantitative', format: ',.2f', title: 'Produção mundial (Gbbl)' }
      ])
    );

  // Faixa vertical ativa (hoverizada)
  const interactiveRule = vl.markRule({
      color: '#bbb',
      strokeWidth: 1.5,
      strokeDash: [3, 3]
    })
    .data(mergedLineData)
    .transform(
      vl.filter(vl.and(hoverSelection, hoverSelection.empty(false)))
    )
    .encode(
      vl.x().fieldT('date').timeUnit('year'),
      vl.opacity().value(0.8)
    );

  return vl.layer(productionLine, priceLine, points, interactiveRule, interactivePoints)
    .resolve({ 
      y: 'independent',
      x: 'shared'
    })
    .title({
      text: "Produção mundial e preço do barril de petróleo bruto em 2002-2023",
      subtitle: copyrightNotice,
      subtitleColor: "#666666",
      subtitleFontSize: 10,
      orient: "bottom", 
    })
    .render();
}


function _58(kbblCrudeoilProduction){return(
kbblCrudeoilProduction
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["countries-50m.json", {url: new URL("./files/254a99fef9cfdc739794cf276a25ffce226b9d17d64789497bbed4935f1fda7d621149894d3a06e546f0e5c53beda2580db0166433ff2fac65397af1aa3627ea.json", import.meta.url), mimeType: "application/json", toString}],
    ["kbbl-crudeoil-production.csv", {url: new URL("./files/399fed0f9898f2e949aa2832b1e696d7cfb9094dba6b1dfc87e68673ba90ab9cf8be57275fb7ed4cb920b42cbdf6a03ab67c6bae6618ec3281314b94043c0269.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["kbbl-crudeoil-exports.csv", {url: new URL("./files/635ea21c48d30b967c4a3de0522006b039eaed8f578c9053468affe31fa9b106e9834b1904146b9f3eeb64e0931e33a5d4e1cf2ad503b05b679a8b52d729e249.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["kbbl-crudeoil-imports.csv", {url: new URL("./files/e932d658f48b0cc0cf5269af20ba792ab50290c65de597c858ac99f1159df52f799155a96c994526527ad42768c1d332b2a80acc723cc29fb9dabdd2c099765b.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["saudi-arabias-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/acd1e51fea5c17fe7d4abd51ce9171bcb51a624d8be1eb3a5644fa5b5fbdab7d5750f0048de7873fea9dee342ee6ca85558d9e09111a263cec1d272cf8bdb7e0.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["russian-federations-exports-to-world-by-importer_2709.csv", {url: new URL("./files/98fef0b9810ca64cd1b9217ec06a196d41f1930b097781510d70b371a6fc1de6360cc2a8c2bada72e9e4b3c195b3feea098928182ff1cc79504015a9a77c91d5.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["iraqs-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/5b14eec653c8fdf02f2890f7a94a8bec25337c04d1f618aadea01c210a0236a18ceec371d14cf64b69b953bbe22a7ade6fef7537838dd77feb7e98243ed2f62d.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["canadas-exports-to-world-by-importer_2709.csv", {url: new URL("./files/cb3133f39695cd44116a582ce880f719b54b8ea855b6f5e7b1968bc2c3d5ac0f28033f692fa96ca9f5b40368fbce9295824e855470d9b1e3a40ff20913856f4e.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["nigerias-exports-to-world-by-importer_2709.csv", {url: new URL("./files/940764f51ece8d2e25b6af10d7b232cd93a52a0933a7dcd8a54a4fa363f3919397f20dcb17742394ceb14bca6b8636cfab00d0bafaa790165104955a13bd37f8.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["iran-islamic-republic-ofs-exports-to-world-by-importer_2709.csv", {url: new URL("./files/1892ceeb7997ee1ed20923fca7b84564053b77f990ae0a8dec155e6d4365e668c5d83cfc45b6e8d9c7d7b93b0d2a94f487dc53aac8c3c6f1c864f868d5e5ce64.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["germanys-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/e36e761c984c3c6f886563a22f36b44375c80a3e1d1d055952b436305da4f6734d910a87440445ff310c579c27dca1b10adc0625fd9ba45bcfef6cfeb8ecbea4.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["japans-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/75ad97b3bc17a1c850685dc138d60b1a589ec777568355524a5e2c4b0fed6fcca98226cde86639b85293df866ef97f1140242266d69acc8b16734d9af0c1dfb9.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["indias-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/caca1817c8b3f2a35e7fb245b24ee676258cb2d45076cda4c23988c568e834ea864d3bba7b0f534e8b050db1cd972c146877841cfa239cf79183843e38d9fbf6.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["united-states-of-americas-exports-to-world-by-importer_2709.csv", {url: new URL("./files/540a8a1067f40a38d579b8fb0ffa894416e27c7ee69e26fb1ace8270ce544984859610bf40722ef167414c94e1c9a432c08b87bd8b4d0691ef6141c5e37e98ab.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["korea-republic-ofs-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/f892671604622ef59674daceebb85dc5ee5aa3f3585d6308dc1f31e732be1b3086869971270e18fbd677ea76138f695c7ce1f932b7a65583a1ed4895fa1026c5.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["chinas-exports-to-world-by-importer_2709.csv", {url: new URL("./files/66caa85fe8cf7c48e25a01d5be88bae5aed6edf8838e8d44b1808391d63c97e0c9220c4db67521c1810ccb3da45a511c556185fd3b12c29915c6747dcb36de37.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["russian-federations-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/bfee8cd111a78bf8cce135c26be825f73425fafbcb63c7abbc1fa16657f876bef6447e1b701a9a980e891b6cf84f23e2a96143c9ca01f7b782c4e6385859d406.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["kazakhstans-exports-to-world-by-importer_2709.csv", {url: new URL("./files/e419e9754ef17fa14a8da91f4927fbf926dc39f4c7f8aded60fe60409aa22455397a3226f6d086f317382c301334f9e2db44b2600f220f49b87f92c3d84fa345.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["kuwaits-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/4a3a3baa6d616f199e3df159961316916ddd19db7a9dd55afe6c5328607f38154855a4d4da6e2b09ddb8c7e88dc62c6bc9ab1b1a3b3c7e0c2d3fdafaf72d4853.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["brazils-exports-to-world-by-importer_2709.csv", {url: new URL("./files/fd596ddc2ed73e163b6d7eb7307bcf4034e7f5dc80014d083f53849c4cce6851f9e402baf06f3ace54053a7f500de793b482d258e664e27359c8e77574764874.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["norways-exports-to-world-by-importer_2709.csv", {url: new URL("./files/9def0b11b8e5470f5aacae7019b8e390a0ac33dac54af1af3bc9390163fa6d3910b1cf58a72763dd8d879f4ace9d4c7027d97340b84b2bc0e83b4430ea1e5491.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["iran-islamic-republic-ofs-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/9146b3d491ca0036d9517e353251d06c95948121d9593e070833dd15496b5bd5799c91c13876cfc7ee730884e7b79257fd03ce6a53b0c80d4e7d1dd0cc4e45bb.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["nigerias-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/7b705c6bd3cbd98d8a68166d5a171b79458d4f90266c3a4da08d1ea37f87f0c3fdb9419bbaba2dd351d652fb47ca0d65283954ad14670c5d953f6887a6216040.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["netherlands-exports-to-world-by-importer_2709.csv", {url: new URL("./files/2a73ac87cab504940b9c9feb1d3795c65a826fd23b10b47276d0465adfd40179845cd80ec01e94077eb11a27148874ce510f065983deaf1d6ef6daa4b21d6943.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["frances-exports-to-world-by-importer_2709.csv", {url: new URL("./files/fe01c9daf6d9aa304ed26becedf6030e374d13212e831d31e9b8782cd005e33f0c7760e15c2ff5428f7c0fc2dc615c3cc1287439b1386617740f32c3bd0e0f77.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["italys-exports-to-world-by-importer_2709.csv", {url: new URL("./files/f2f0e8ea8864b81fcadd96f76d1f350c5ed77a24da610e7fb8a73b8d8ebffe2ef080d32ff0ddfa16ec839dd7a9ba62200a6e6ca591d5fe0b97baa960f83462ea.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["thailands-exports-to-world-by-importer_2709.csv", {url: new URL("./files/c91502975d505a0655a94a11088ac2386d7b4b150d1aecc218067a2863906e64bfce406c4a0427228556caeebeacac3b471f6e8d1b5dfeb0ae363097b9a6129f.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["spains-exports-to-world-by-importer_2709.csv", {url: new URL("./files/f508962de837b55611a3151379c15faa94f183f3df368f1618aadb4ea050bad976ebb3c22227662361a2dc9555c697de9f49d0f0ce3981e60075b39930b8441a.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["singapores-exports-to-world-by-importer_2709.csv", {url: new URL("./files/5dac5cdc13a1c4eedc109a691f7e501f4eb8298c6d2b8c9311ac2e74be94933f643cc580a15625c3a03532028c25aa52ece5e9840f483da4a298e57505a8fd9f.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["united-kingdoms-exports-to-world-by-importer_2709.csv", {url: new URL("./files/8340637fcdc31b23b073fa236bb322b128cdb2d81ad34ae9b690e130191a072a9bb3e9d547caaee08dd9b3410f8aaf991d67a2be0eb200a749a92ab3eb28c9e8.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["medium.geo.json", {url: new URL("./files/69075f799df51fea86e419bc9bcec6b4fbd130e174ff7e2ceb0a24ddde6f9cf28ca637f2d94eddcdef5644417decd9814e2d64af1f19dea5bfed629964243d5f.json", import.meta.url), mimeType: "application/json", toString}],
    ["kbbl-total-output.csv", {url: new URL("./files/cba6302209c96c84a26aa388b7d1e352f03829e6462e3e16b9525cbfbd225ecc4e89f1304b3d7e9bd80e404ac0af9808da4d4cb5f1e9b270e70de85f76db6f4f.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["kbbl-total-demand.csv", {url: new URL("./files/99a93fd6ce88e6c78a9ca02c1e9049a864edbf367cc4f79dc4fd7d62bfc4af91e4a84b9f83d2df32a134cc2a6ed73b7b74e2504c2c37f0edcdb81375b0d69873.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["kbbl-crudeoil-stockchange.csv", {url: new URL("./files/babf00ad12bc79038080e74294e4c198679c5f9a13b0624618e7c63f96662afaed9a68fd998f3c4b109b819b89d34e199ff6158ca586f9c138528bb4ecb96ab4.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["kbbl-crudeoil-closingstocks.csv", {url: new URL("./files/b337cbcf0f6875643bb3fb113ee5aa84214ac25a53edfefa23243fd43a591089ce3c38b73a0b910b0cee7cb819a1da3eb07db23a977dcabe67081333a1cebcc2.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-saudi-arabias-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/a496ba25ad7592781e33e079b88bbb6738e6e0564843389fa8b0cbe52236e67033690a5f33446159c063ff45e660c3e5afbf6cbe0463b6dd141d59407a4f2826.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-russian-federations-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/fc8261428ac607a8139cbea695476e5f2e2b19aa2de229456841cda4d3cb9dd08d68d40d494fef20d983cc835276f0f28380e7cdad6d92176e8dcf41bb53b2ca.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-russian-federations-exports-to-world-by-importer_2709.csv", {url: new URL("./files/7583289ef17be5f996e5c58afc4da64d89104a9b4577cc6025401dd35bc730eba45cda7295364e5f540e434209904a37c5e154fc19b87f32368b006104f088f3.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-nigerias-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/cba05f3c7b40971d60207374b414f543bb23236098e2c31df3886886ff0d5a81e5e79477b09303d94e9f6f18943efeebef567b04589a86d092ee70443254499e.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-iraqs-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/08f029ad8766dd4e277603a988d6417828b3a05334d1ad892df9a562f502e6551b3d81cc7c148f0455c7cf11260b75320c3e83aae3cb016811f7021868fe2c86.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-iran-islamic-republic-ofs-exports-to-world-by-importer_2709.csv", {url: new URL("./files/2fd1243580bd44ba5eded1dce64b361b491b7ad7a3472d15b77432c81bc5e79ec9a6c43735c604a0b36527369b5ab713ef90e8966f21325316f223f9719089f2.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-nigerias-exports-to-world-by-importer_2709.csv", {url: new URL("./files/c8de81b8b45fc4f6b30eb1106b810c94f4a6a38278750f6ea2ade96ceafb609dcaf1fcb287e465b1ff5fccbdda9a3b800721feb710df80536b24db35b88d1e12.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-iran-islamic-republic-ofs-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/dfe2946b3da59e1527deedb4da1d78b5a3c9d7800b4588a1417652fb5f777fa4fdab9fe003a32d7f46cc6f4f49ec705f79d3bbe06b5ef7d731498524cec3aafd.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-canadas-exports-to-world-by-importer_2709.csv", {url: new URL("./files/eb9999ce21f172c4269621029e94ee921b39d5569c48947f84ae7492aa535cefc7ac8c9e8f0e947a2691dbc2d785e75d81a8f0cdeffda2e380977ccbedc5514c.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-norways-exports-to-world-by-importer_2709.csv", {url: new URL("./files/8104204ee6af30fa7aa3ba4169f41348ed83208919092604b1705198ee61c0d7fa055948277c18cfed3425ceb43af0490af882f24b0ef166fdeb5037341e6df4.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-netherlands-exports-to-world-by-importer_2709.csv", {url: new URL("./files/28ce162626380884924b2415939a492caa6adef44a37dddf81b56f5c065fcb5e54e539a797c2aeaff03ab784c34914e2ec9b5d0dd3a684ccd04fb9121a95838d.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-germanys-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/c259319b4a95008029cc19b399f0d0b0254fce8be8a641017d82e113e1fbd53ed5295ac5ecdd4c735575865a9951d42c2ac963dfa8ad6ff898370c82a0a43a97.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-indias-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/0dfd68310b9b75e3545736fa2dd44c501b5be24a24ca51561e18f8fd6426f27b9707e54d78a575df3543a898b32e680b3f0540d6dc298cc01af4074267b58e53.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-thailands-exports-to-world-by-importer_2709.csv", {url: new URL("./files/61ace2e8022a60f99fd45541ffe4c99df6c2f6efe8d4834377fa7d0fb4afac912c6fea6106e02f5b7483642e67f7628905f96fddc9031698b3ed90b45ae90c81.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-united-kingdoms-exports-to-world-by-importer_2709.csv", {url: new URL("./files/9c2f16ffa2579eb5c2fba32bb184e62cc6e07e736b3e72d497bbf0818f20b2d011f7fe5171cbe250947726f143bafa3b15655b306e36153e2d9ff49549571f99.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-frances-exports-to-world-by-importer_2709.csv", {url: new URL("./files/f21919ff4068c2adc96599dfa5ebe33eb256cbd03123f751e29b11c3fb647805e30819c3a299ee4401342254a24d57e2dcb80687f57e18305e4e9216577eee0a.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-korea-republic-ofs-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/57a3e4798c2aaa2a4828cdde49dc9c24ab8bb64f8164809e13c237e143088ff4c832b13126ee9d9c2ab08cc82c1fb069c571ac3d001a40be8c059b2ca6fc0b60.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-united-states-of-americas-exports-to-world-by-importer_2709.csv", {url: new URL("./files/445112394307afcab489897921914337572e13bdac500c6d08f06ef4aafc99b91a0963dfd9d03c4b01e7caea225817a62f93ea86c810768030eda9a0b07c0e69.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-kuwaits-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/282144f246e7bebf1157098e36130f490f224197c9dc9b4a033b388a9d67fb902247fa1c514cea94fce092405501f0aba28e440edc82be44ed116369657fc41d.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-brazils-exports-to-world-by-importer_2709.csv", {url: new URL("./files/565869aa49c6d74064de4ca1891ebdcf68ed55ddf4b189ea6ee7178e3cb285ca34cc6ae5dbb307a5966fefd2c21ff14f5c4e07eff655e888df94d64387a88e3b.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-italys-exports-to-world-by-importer_2709.csv", {url: new URL("./files/84986ee3bf3f96ffc43a39a5518f92f14a915b79a87fb950a4f17c889d9a036a826c7bf02be20141dc052b825f7f67026ea184cfd7d17e6fe6b99cf6caa92842.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-chinas-exports-to-world-by-importer_2709.csv", {url: new URL("./files/6e071d4ddf1de667fccd255473036bdbbad3f1f393896ada6688c0d0be180aefc6ae1e3802f37fae555abe89bb9771b9b571cfb896e87fca40cce4d49b380fc0.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-spains-exports-to-world-by-importer_2709.csv", {url: new URL("./files/3aee28094f7c8fc2a90f72425edf9d3c261c4b3f00817d84ff167973c49e17e05a3b5f5080c01eceb0845a3e9f0f365bcea0b7041c6833a84530f186fc158df4.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-japans-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/48f2edfa107cc114d4b9f67ad1f643bd6dadede4564d630382429fb6fdf45d3444da04e0078509416f1b5f8d2d2ee3dfb22fce3f01d32b3b064f6f8e7cfaaeb5.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-singapores-exports-to-world-by-importer_2709.csv", {url: new URL("./files/1e4003acb79470d9a900375da55d6cf6e34add88b1c4cbedc7c1c33ac7b548fdf50933f4f68524f3fdd716d59d2bdaf047b0eea6d7bd7df49e16dfa144f7ffd1.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-kazakhstans-exports-to-world-by-importer_2709.csv", {url: new URL("./files/dc0e4db66a6ecf981d90d189872877ea4f31d4b4d735f2e804eb616dcfef285370adf44b3b3ff8752a06f2c18e4caa8a1ef36555a3cad73f22e09d923465cda0.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["POILBREUSDM.csv", {url: new URL("./files/4daf1f02b51a339a9b6c2a8f707a570d9ae86c669e01a8b8e03005243ca87f0b0782cadd518348ca092d008d6d19b5e5f625902005a790309f5db6cf777dec1a.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-united-arab-emirates-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/4d471c1aadb1b1248676b37e611c51ca329fe3b472b545aaeb744c45350d24306b6229a295ed6d305a1a581ee8b2dc3f275cab8ae243911c59f5c648b886477a.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["united-arab-emirates-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/e6de3727d33c19f97d484f2881b2b4cd8a56d2c147e029acb94fdee721029de734ae3f9689c14780a0ce3bb52dc4d0651770b0141abec1b7b671f02e2cb7c486.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-malaysias-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/bfe856fc0da624d9723e8f4d4238fe3107834d698c4d99f704d2293ff94c432ff122c48139f53412141f8942989256b63a4a661316b8d8f5272d3c607ccf5661.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["malaysias-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/c04952401e15c89df6e24bbbe38592cfdf14f747937794e8d6ae83d848174b4228a961559fcf8b1a55cbd3ae6a17b63ffac5210e8a583250f5e9faedeb6973a5.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["indonesias-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/1addc01b7203a3b59318d0f60c25727a52ed56196b7fc99fb1b67d23e46f7b1c8ab504918c4ddc187496a7736ccb9292296b6e44a75e4aa40a61c64fc5806bdc.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-indonesias-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/89f2c5490d4012c437d7f168d726e751ccfa24b8d005a3110e3fa7068842cf63d9a4c59a5ef3acd87b3b3f3a61999743bc343f01268cb6a2ea787b7a4c660c4a.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-egypts-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/af390fbf9c2f9befd0b056e69e840708c105ab13fb30237925457156d6a360a3e1cf3bd96808e0af6f7abf66c3680fa66ce18c62905e6087c19a5bd0f410666f.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["egypts-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/c71eb2555cb32856c84bada4d97c6764532e3c875e82e8b3db97cdbda2f9c1387468a2b30ef5c25dba5aa67afb1f9034bb808c9d538dbdaa3b67a57eead575f2.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["angolas-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/3505428dfab3d2cfdb948e7241fd69dbacb99cb2e4438ffec364cd7fd5fc7acb82f21f23cad810957858da032effc0696c3ad7978f1ef5235c2795109aa41727.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["2-angolas-exports-to-world-by-importer-mirror_2709.csv", {url: new URL("./files/fd2d46d13b53a053a3139bee1760e23a19bd1f76e2ee0a73dd77c66561934a972aeab7cd40d2dacaa8b85bc8c0b11447179e5d0630aa803f565ecd9345f6b450.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("vl", child1);
  main.variable(observer("world")).define("world", ["FileAttachment"], _world);
  main.variable(observer("geodata")).define("geodata", ["FileAttachment"], _geodata);
  main.variable(observer("countryCentroids")).define("countryCentroids", ["geodata","d3"], _countryCentroids);
  main.variable(observer("background_world_map")).define("background_world_map", ["vl","world","width"], _background_world_map);
  main.variable(observer("country_dots_world_map")).define("country_dots_world_map", ["vl","countryCentroids"], _country_dots_world_map);
  main.variable(observer("world_map")).define("world_map", ["vl","background_world_map","country_dots_world_map","width"], _world_map);
  main.variable(observer("kbblCrudeoilProduction")).define("kbblCrudeoilProduction", ["FileAttachment","dinamizeDate"], _kbblCrudeoilProduction);
  main.variable(observer("kbblCrudeoilExports")).define("kbblCrudeoilExports", ["FileAttachment","dinamizeDate"], _kbblCrudeoilExports);
  main.variable(observer("kbblCrudeoilImports")).define("kbblCrudeoilImports", ["FileAttachment","dinamizeDate"], _kbblCrudeoilImports);
  main.variable(observer("colors_for_top_production")).define("colors_for_top_production", _colors_for_top_production);
  main.variable(observer("colors_for_top_exports")).define("colors_for_top_exports", _colors_for_top_exports);
  main.variable(observer("colors_for_top_imports")).define("colors_for_top_imports", _colors_for_top_imports);
  main.variable(observer("monthMap")).define("monthMap", _monthMap);
  main.variable(observer("strToDate")).define("strToDate", ["monthMap"], _strToDate);
  main.variable(observer("parseNumber")).define("parseNumber", _parseNumber);
  main.variable(observer("dinamizeDate")).define("dinamizeDate", ["strToDate","parseNumber"], _dinamizeDate);
  main.variable(observer("viewof NumberHighlightedCountries")).define("viewof NumberHighlightedCountries", ["Inputs"], _NumberHighlightedCountries);
  main.variable(observer("NumberHighlightedCountries")).define("NumberHighlightedCountries", ["Generators", "viewof NumberHighlightedCountries"], (G, _) => G.input(_));
  main.variable(observer("viewof StackedBarsDataSelection")).define("viewof StackedBarsDataSelection", ["Inputs","kbblCrudeoilProduction","colors_for_top_production","kbblCrudeoilExports","colors_for_top_exports","kbblCrudeoilImports","colors_for_top_imports"], _StackedBarsDataSelection);
  main.variable(observer("StackedBarsDataSelection")).define("StackedBarsDataSelection", ["Generators", "viewof StackedBarsDataSelection"], (G, _) => G.input(_));
  main.variable(observer("rank_graph_over_time")).define("rank_graph_over_time", ["rank_over_time","StackedBarsDataSelection","NumberHighlightedCountries"], _rank_graph_over_time);
  main.variable(observer("rank_over_time")).define("rank_over_time", ["vl","width"], _rank_over_time);
  main.variable(observer("convertToKbbl")).define("convertToKbbl", _convertToKbbl);
  main.variable(observer("dinamizeDateFromTrade")).define("dinamizeDateFromTrade", ["parseNumber"], _dinamizeDateFromTrade);
  main.variable(observer("exports")).define("exports", ["FileAttachment","dinamizeDateFromTrade"], _exports);
  main.variable(observer("exporters")).define("exporters", _exporters);
  main.variable(observer("projection")).define("projection", ["d3","width"], _projection);
  main.variable(observer("preProjectedCentroids")).define("preProjectedCentroids", ["countryCentroids","projection"], _preProjectedCentroids);
  main.variable(observer()).define(["countryCentroids"], _29);
  main.variable(observer("get_threshold_expr_and_domain")).define("get_threshold_expr_and_domain", _get_threshold_expr_and_domain);
  main.variable(observer("shorten")).define("shorten", _shorten);
  main.variable(observer("shortenedExporters")).define("shortenedExporters", ["exporters","shorten"], _shortenedExporters);
  main.variable(observer("shortenedExports")).define("shortenedExports", ["exports","shorten"], _shortenedExports);
  main.variable(observer("themeColors")).define("themeColors", _themeColors);
  main.variable(observer("yearSelection")).define("yearSelection", ["vl"], _yearSelection);
  main.variable(observer("selectCell")).define("selectCell", ["vl"], _selectCell);
  main.variable(observer("selectExporter")).define("selectExporter", ["vl"], _selectExporter);
  main.variable(observer("selectImporter")).define("selectImporter", ["vl"], _selectImporter);
  main.variable(observer("hoverCell")).define("hoverCell", ["vl"], _hoverCell);
  main.variable(observer("hoverExporter")).define("hoverExporter", ["vl"], _hoverExporter);
  main.variable(observer("hoverImporter")).define("hoverImporter", ["vl"], _hoverImporter);
  main.variable(observer("viewof exportHeatMap")).define("viewof exportHeatMap", ["selectCell","selectExporter","selectImporter","hoverCell","hoverExporter","hoverImporter","vl","themeColors","get_threshold_expr_and_domain","shortenedExports","shortenedExporters","d3","width","countryCentroids","shorten","topojson","world","yearSelection","Event"], _exportHeatMap);
  main.variable(observer("exportHeatMap")).define("exportHeatMap", ["Generators", "viewof exportHeatMap"], (G, _) => G.input(_));
  main.variable(observer("sideBars")).define("sideBars", ["exportHeatMap","html","shortenedExports","vl","themeColors"], _sideBars);
  main.variable(observer("dinamizeDateFromTrade2")).define("dinamizeDateFromTrade2", ["convertToKbbl"], _dinamizeDateFromTrade2);
  main.variable(observer("exports2")).define("exports2", ["FileAttachment","dinamizeDateFromTrade2"], _exports2);
  main.variable(observer("shortenedExports2")).define("shortenedExports2", ["exports2","shorten"], _shortenedExports2);
  main.variable(observer("viewof exportHeatMap2")).define("viewof exportHeatMap2", ["selectCell","selectExporter","selectImporter","hoverCell","hoverExporter","hoverImporter","vl","themeColors","get_threshold_expr_and_domain","shortenedExports2","shortenedExporters","d3","width","countryCentroids","shorten","topojson","world","yearSelection","Event"], _exportHeatMap2);
  main.variable(observer("exportHeatMap2")).define("exportHeatMap2", ["Generators", "viewof exportHeatMap2"], (G, _) => G.input(_));
  main.variable(observer("sideBars2")).define("sideBars2", ["exportHeatMap2","html","shortenedExports2","vl","themeColors"], _sideBars2);
  main.variable(observer("kbblTotalDemandOutput")).define("kbblTotalDemandOutput", ["FileAttachment","dinamizeDate"], _kbblTotalDemandOutput);
  main.variable(observer("demandVersusOutput")).define("demandVersusOutput", ["vl","kbblTotalDemandOutput"], _demandVersusOutput);
  main.variable(observer("kbblCrudeoilStockchangeData")).define("kbblCrudeoilStockchangeData", ["FileAttachment","dinamizeDate"], _kbblCrudeoilStockchangeData);
  main.variable(observer("kbblCrudeoilClosingStocks")).define("kbblCrudeoilClosingStocks", ["FileAttachment","dinamizeDate"], _kbblCrudeoilClosingStocks);
  main.variable(observer("viewof selectedCountry")).define("viewof selectedCountry", ["Inputs","kbblCrudeoilStockchangeData"], _selectedCountry);
  main.variable(observer("selectedCountry")).define("selectedCountry", ["Generators", "viewof selectedCountry"], (G, _) => G.input(_));
  main.variable(observer("stockdiffBarChart")).define("stockdiffBarChart", ["kbblCrudeoilStockchangeData","selectedCountry","kbblCrudeoilClosingStocks","vl","width"], _stockdiffBarChart);
  main.variable(observer("copyrightNotice")).define("copyrightNotice", _copyrightNotice);
  main.variable(observer("poilbreusdm")).define("poilbreusdm", ["__query","FileAttachment","invalidation"], _poilbreusdm);
  main.variable(observer("lineGraph")).define("lineGraph", ["poilbreusdm","kbblCrudeoilProduction","vl","copyrightNotice"], _lineGraph);
  main.variable(observer()).define(["kbblCrudeoilProduction"], _58);
  return main;
}
