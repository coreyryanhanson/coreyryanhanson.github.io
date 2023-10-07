---
jobTitle: "Machine Learning Engineer"
employer: "Virtue Foundation (remote)"
startDate: "Jan 2022"
endDate: "Jul 2023"
company: "Virtue Foundation"
city: "New York"
state: "NY"
---

* Created geospatial data pipeline scaled to integrate publicly available GIS data from 72 countries including tiled raster satellite data, vectors from open street maps, internal hospital data from the foundation, etc. to an open source hospital statistical analysis library (Accessmod).
* Deployed the pipeline using a cloud service, Flask API and Docker images for separate Python and R codebases.
* Automated sending the outputs and cached intermediate files to Microsoft Azure based data lake storage.
* Integrated custom logging into the data lake that tracked errors, peak ram usage and per run server costs.
* Found creative solutions to enrich existing datasets including a random forest regressor to impute gaps in health facility data and a workflow to sample from the Google directions API to inform better estimates of road speeds.
* Automated a geospatial workflow to standardize all inputs to the same equal area projection and resolution with minimal loss and distortion generating custom projection strings based on a region's centroid coordinates.
* Built custom sanity checks to measure result correlation to development and poverty indicators such as data from global health surveys and nighttime satellite illumination data.
* Created custom interactive visualizations using the raw output data. Formulated a flexible and efficient way to vectorize raster outputs in a clear way in order to work with the Carto platform.
