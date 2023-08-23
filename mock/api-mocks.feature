Feature: API mocks

Background:
    # * def url ''

Scenario: pathMatches('/api/tasks') && methodIs('get')
    * def response = [{"id":"idol0j2msii4was5pglosuhg","title":"Clean car","completed":false,"createdAt":"2023-08-22T10:21:36.417Z"},{"id":"w7vmmxm4ual4px8dbgd4cmu3","title":"Read a book","completed":false,"createdAt":"2023-08-22T10:23:18.678Z"},{"id":"t0qv3t8o582ay4946vomaket","title":"Take a nap","completed":true,"createdAt":"2023-08-22T10:23:18.679Z"},{"id":"uvygm39944h8agxsb1k1wcut","title":"Pay bills","completed":false,"createdAt":"2023-08-22T10:23:18.681Z"},{"id":"jitw8zfgdesi2z4ifnteanji","title":"Do laundry","completed":false,"createdAt":"2023-08-22T10:23:18.681Z"}]
    * def responseStatus = 200

Scenario: pathMatches('/api/tasks') && methodIs('post')
    * def response = {"id":"x8rqzu5cnbt1dj35czgm01yn","title":"Phone friend","completed":false,"createdAt":"2023-08-22T20:43:40.468Z"}
    * def responseStatus = 201

Scenario: pathMatches('/api/tasks/x8rqzu5cnbt1dj35czgm01yn') && methodIs('put') && bodyPath('$.title') != null
    * def response = {"id":"x8rqzu5cnbt1dj35czgm01yn","title":"Phone friend edited!","completed":false,"createdAt":"2023-08-22T20:43:40.468Z"}
    * def responseStatus = 200

Scenario: pathMatches('/api/tasks/{id}') && methodIs('put') && bodyPath('$.completed') != 'Scooby'
    * def response = {"id":"x8rqzu5cnbt1dj35czgm01yn","title":"Phone friend edited!","completed":true,"createdAt":"2023-08-22T20:43:40.468Z"}
    * def responseStatus = 200

Scenario: pathMatches('/api/tasks/x8rqzu5cnbt1dj35czgm01yn') && methodIs('delete') 
    * def response = ''
    * def responseStatus = 204