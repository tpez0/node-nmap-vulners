var should = require('chai').should(),
  assert = require('assert'),
  expect = require('chai').expect,
  nmap = require('../index');


describe('NmapScan', function() {

  it('runs NMAP', function(done) {

    this.timeout(10000);
    var scan = new nmap.NmapScan("google.com");
    scan.on('complete', function(data) {
      expect(data).to.be.instanceOf(Array);
      expect(data).to.not.be.empty;
      expect(data[0]).to.include.keys('hostname', 'ip', 'mac', 'openPorts', 'osNmap');
      done();
    });
    scan.startScan();
  });

  it('accepts space separated command', function(done) {

    this.timeout(10000);
    var scan = new nmap.NmapScan("-sn 127.0.0.1");
    scan.on('complete', function(data) {

      expect(data).to.be.instanceOf(Array);
      expect(data).to.not.be.empty;
      expect(data[0]).to.include.keys('hostname', 'ip', 'mac', 'openPorts', 'osNmap');
      done();
    });
    scan.startScan();
  });

  it('accepts multiple hosts', function(done) {

    this.timeout(10000);
    var scan = new nmap.NmapScan("-sn 127.0.0.1 google.com");
    scan.on('complete', function(data) {

      expect(data).to.be.instanceOf(Array);
      expect(data).to.not.be.empty;
      expect(data[1]).to.include.keys('hostname', 'ip', 'mac', 'openPorts', 'osNmap');
      done();
    });
    scan.startScan();
  });
  it('returns failure data for bad requests', function(done) {

    this.timeout(10000);
    var scan = new nmap.NmapScan("127.0.0.");
    scan.on('error', function(err) {
      expect(err).to.be.a('string');
      done();
    });
    scan.startScan();
  });

});