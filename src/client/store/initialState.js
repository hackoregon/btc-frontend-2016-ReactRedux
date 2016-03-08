export default {
  searchData: {
    searchTerm: null,
    list: null,
    fetching: {
      status: null,
      statusText: null
    }
  },
  resultData: {
    summaryData: {
      candidate_name: '',
      committee_name: '',
      race: '',
      total: null,
      total_spent: null,
      grassroots: null,
      instate: null,
      filer_id: null,
      election: '',
      num_transactions: null,
      committee_type: ''
    },
    donorData: {
      individual: {
        type: 'Top Individual Donors',
        donors: []
      },
      pac: {
        type: 'Top PAC Donors',
        donors: []
      },
      business: {
        type: 'Top Business Donors',
        donors: []
      },
      grassroots: {
        type: 'Grassroots',
        donors: []
      },
      party: {
        type: 'Party',
        donors: []
      },
      unknown: {
        type: 'unknown',
        donors: []
      }
    },
    locationData: {
      donations: [{
        state: 'Alaska',
        value: 700
      }, {
        state: 'Arizona',
        value: 2750
      }, {
        state: 'California',
        value: 84717.44
      }, {
        state: 'Colorado',
        value: 21750
      }, {
        state: 'Connecticut',
        value: 250
      }, {
        state: 'Maryland',
        value: 324615.36
      }, {
        state: 'Florida',
        value: 1098
      }, {
        state: 'Georgia',
        value: 700
      }, {
        state: 'Hawaii',
        value: 1000
      }, {
        state: 'Idaho',
        value: 5200
      }, {
        state: 'Illinois',
        value: 6500
      }, {
        state: 'Louisiana',
        value: 250
      }, {
        state: 'Massachusetts',
        value: 28972
      }, {
        state: 'Maryland',
        value: 2150
      }, {
        state: 'Michigan',
        value: 26400
      }, {
        state: 'Minnesota',
        value: 6950
      }, {
        state: 'Missouri',
        value: 550
      }, {
        state: 'North Carolina',
        value: 2500
      }, {
        state: 'New Hampshire',
        value: 300
      }, {
        state: 'New Jersey',
        value: 4500
      }, {
        state: 'New Mexico',
        value: 2150
      }, {
        state: 'Nevada',
        value: 6500
      }, {
        state: 'New York',
        value: 25955
      }, {
        state: 'Ohio',
        value: 100
      }, {
        state: 'Oklahoma',
        value: 500
      }, {
        state: 'Oregon',
        value: 2314893.12
      }, {
        state: 'Pennsylvania',
        value: 3100
      }, {
        state: 'South Carolina',
        value: 250
      }, {
        state: 'Tennessee',
        value: 10250
      }, {
        state: 'Texas',
        value: 1950
      }, {
        state: 'Utah',
        value: 250
      }, {
        state: 'Virginia',
        value: 5775
      }, {
        state: 'Vermont',
        value: 700
      }, {
        state: 'Washington',
        value: 57670.26
      }, {
        state: 'Wisconsin',
        value: 500
      }, {
        state: 'West Virginia',
        value: 1110
      }]
    },
    whenData: {
      dates: [{
        filer_id: 931,
        tran_date: '2015-12-27',
        total_in: 9052.5,
        total_out: 467.19
      }, {
        filer_id: 931,
        tran_date: '2015-12-28',
        total_in: 1131,
        total_out: 7500
      }, {
        filer_id: 931,
        tran_date: '2015-12-29',
        total_in: 1564,
        total_out: 4700
      }, {
        filer_id: 931,
        tran_date: '2015-12-30',
        total_in: 3475,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2015-12-31',
        total_in: 33777,
        total_out: 8353.09
      }, {
        filer_id: 931,
        tran_date: '2016-01-01',
        total_in: 200,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-01-02',
        total_in: 1425,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-01-03',
        total_in: 3975,
        total_out: 157.02
      }, {
        filer_id: 931,
        tran_date: '2016-01-04',
        total_in: 25267,
        total_out: 87.84
      }, {
        filer_id: 931,
        tran_date: '2016-01-05',
        total_in: 108714.6,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-01-06',
        total_in: 4549.73,
        total_out: 26.99
      }, {
        filer_id: 931,
        tran_date: '2016-01-07',
        total_in: 2485,
        total_out: 2.37
      }, {
        filer_id: 931,
        tran_date: '2016-01-08',
        total_in: 6520,
        total_out: 1043.21
      }, {
        filer_id: 931,
        tran_date: '2016-01-09',
        total_in: 125,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-01-10',
        total_in: 6255,
        total_out: 237.29
      }, {
        filer_id: 931,
        tran_date: '2016-01-11',
        total_in: 5570,
        total_out: 5805.09
      }, {
        filer_id: 931,
        tran_date: '2016-01-12',
        total_in: 2050,
        total_out: 285.85
      }, {
        filer_id: 931,
        tran_date: '2016-01-13',
        total_in: 32910,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-01-14',
        total_in: 355,
        total_out: 1166.48
      }, {
        filer_id: 931,
        tran_date: '2016-01-15',
        total_in: 40,
        total_out: 7838.42
      }, {
        filer_id: 931,
        tran_date: '2016-01-17',
        total_in: 3516.5,
        total_out: 139.1
      }, {
        filer_id: 931,
        tran_date: '2016-01-18',
        total_in: 15000,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-01-19',
        total_in: 1520,
        total_out: 83.5
      }, {
        filer_id: 931,
        tran_date: '2016-01-20',
        total_in: 5500,
        total_out: 350
      }, {
        filer_id: 931,
        tran_date: '2016-01-21',
        total_in: 9121.1,
        total_out: 1530.48
      }, {
        filer_id: 931,
        tran_date: '2016-01-22',
        total_in: 16535,
        total_out: 514.4
      }, {
        filer_id: 931,
        tran_date: '2016-01-23',
        total_in: 4675,
        total_out: 5730.35
      }, {
        filer_id: 931,
        tran_date: '2016-01-24',
        total_in: 6729.5,
        total_out: 266.2
      }, {
        filer_id: 931,
        tran_date: '2016-01-25',
        total_in: 11140,
        total_out: 29.99
      }, {
        filer_id: 931,
        tran_date: '2016-01-26',
        total_in: 10030,
        total_out: 673.99
      }, {
        filer_id: 931,
        tran_date: '2016-01-27',
        total_in: 200,
        total_out: 1470.6
      }, {
        filer_id: 931,
        tran_date: '2016-01-28',
        total_in: 1250,
        total_out: 2085.26
      }, {
        filer_id: 931,
        tran_date: '2016-01-29',
        total_in: 145,
        total_out: 74197.45
      }, {
        filer_id: 931,
        tran_date: '2016-01-30',
        total_in: 3525,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-01-31',
        total_in: 18761,
        total_out: 702.77
      }, {
        filer_id: 931,
        tran_date: '2016-02-01',
        total_in: 23495,
        total_out: 20
      }, {
        filer_id: 931,
        tran_date: '2016-02-02',
        total_in: 22268,
        total_out: 334.54
      }, {
        filer_id: 931,
        tran_date: '2016-02-03',
        total_in: 10395,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-04',
        total_in: 1540,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-05',
        total_in: 14011.83,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-06',
        total_in: 802,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-07',
        total_in: 55,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-08',
        total_in: 12244.63,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-09',
        total_in: 3650,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-10',
        total_in: 76045,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-11',
        total_in: 5853,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-12',
        total_in: 4334.5,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-13',
        total_in: 35,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-14',
        total_in: 80,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-15',
        total_in: 2700,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-16',
        total_in: 11013,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-17',
        total_in: 1826,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-19',
        total_in: 1151,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-21',
        total_in: 140,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-22',
        total_in: 5678.18,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-23',
        total_in: 3853.33,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-24',
        total_in: 770,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-25',
        total_in: 720,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-26',
        total_in: 4985,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-27',
        total_in: 35,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-28',
        total_in: 220,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-02-29',
        total_in: 11155.5,
        total_out: null
      }, {
        filer_id: 931,
        tran_date: '2016-03-01',
        total_in: 315,
        total_out: null
      }]
    },
    fetching: {
      status: null,
      statusText: null
    }
  }
};
//
// {
//   tran_id: 2182790,
//   tran_date: '2016-03-01',
//   filer: 'Kate Brown Committee',
//   contributor_payee: 'Democratic Party of Oregon (353)',
//   sub_type: 'In-Kind Contribution',
//   amount: 200,
//   contributor_payee_committee_id: 353,
//   filer_id: 931,
//   purp_desc: 'office space',
//   book_type: 'Political Party Committee',
//   addr_line1: '232 NE 9th Ave',
//   filed_date: '2016-03-03',
//   addr_line2: null,
//   city: 'Portland',
//   state: 'OR',
//   zip: 97232,
//   purpose_codes: 'General Operational Expenses (need description)',
//   direction: 'in',
//   contributor_payee_class: null
// }, {
//   tran_id: 2183526,
//   tran_date: '2016-03-01',
//   filer: 'Kate Brown Committee',
//   contributor_payee: 'Miscellaneous Cash Contributions $100 and under ',
//   sub_type: 'Cash Contribution',
//   amount: 115,
//   contributor_payee_committee_id: null,
//   filer_id: 931,
//   purp_desc: null,
//   book_type: null,
//   addr_line1: null,
//   filed_date: '2016-03-03',
//   addr_line2: null,
//   city: null,
//   state: null,
//   zip: null,
//   purpose_codes: null,
//   direction: 'in',
//   contributor_payee_class: 'grassroots_contributor'
// }, {
//   tran_id: 2180936,
//   tran_date: '2016-02-29',
//   filer: 'Kate Brown Committee',
//   contributor_payee: 'T-Y-Lin International',
//   sub_type: 'Cash Contribution',
//   amount: 200,
//   contributor_payee_committee_id: null,
//   filer_id: 931,
//   purp_desc: null,
//   book_type: 'Business Entity',
//   addr_line1: '345 California St., Ste. 2300',
//   filed_date: '2016-03-02',
//   addr_line2: null,
//   city: 'San Francisco',
//   state: 'CA',
//   zip: 94104,
//   purpose_codes: null,
//   direction: 'in',
//   contributor_payee_class: null
// }, {
//   tran_id: 2182817,
//   tran_date: '2016-02-29',
//   filer: 'Kate Brown Committee',
//   contributor_payee: 'Stephanie Vardavas',
//   sub_type: 'Cash Contribution',
//   amount: 100,
//   contributor_payee_committee_id: null,
//   filer_id: 931,
//   purp_desc: null,
//   book_type: 'Individual',
//   addr_line1: '3826 NE Hassalo Street',
//   filed_date: '2016-03-02',
//   addr_line2: null,
//   city: 'Portland',
//   state: 'OR',
//   zip: 97232,
//   purpose_codes: null,
//   direction: 'in',
//   contributor_payee_class: 'grassroots_contributor'
// }, {
//   tran_id: 2180971,
//   tran_date: '2016-02-29',
//   filer: 'Kate Brown Committee',
//   contributor_payee: 'Confederated Tribes of Siletz Indians',
//   sub_type: 'Cash Contribution',
//   amount: 2000,
//   contributor_payee_committee_id: null,
//   filer_id: 931,
//   purp_desc: null,
//   book_type: 'Other',
//   addr_line1: 'PO Box 549',
//   filed_date: '2016-03-02',
//   addr_line2: null,
//   city: 'Siletz',
//   state: 'OR',
//   zip: 97380,
//   purpose_codes: null,
//   direction: 'in',
//   contributor_payee_class: null
// }, {
//   tran_id: 2182833,
//   tran_date: '2016-02-29',
//   filer: 'Kate Brown Committee',
//   contributor_payee: 'Suzanne Noland',
//   sub_type: 'Cash Contribution',
//   amount: 75,
//   contributor_payee_committee_id: null,
//   filer_id: 931,
//   purp_desc: null,
//   book_type: 'Individual',
//   addr_line1: '1209 SW 6th Avenue #806',
//   filed_date: '2016-03-02',
//   addr_line2: null,
//   city: 'Portland',
//   state: 'OR',
//   zip: 97204,
//   purpose_codes: null,
//   direction: 'in',
//   contributor_payee_class: 'grassroots_contributor'
// }, {
//   tran_id: 2180972,
//   tran_date: '2016-02-29',
//   filer: 'Kate Brown Committee',
//   contributor_payee: 'Eleanor Blanton',
//   sub_type: 'Cash Contribution',
//   amount: 500,
//   contributor_payee_committee_id: null,
//   filer_id: 931,
//   purp_desc: null,
//   book_type: 'Individual',
//   addr_line1: '203 Burchard Dr.',
//   filed_date: '2016-03-02',
//   addr_line2: null,
//   city: 'Scottsburg',
//   state: 'OR',
//   zip: 97473,
//   purpose_codes: null,
//   direction: 'in',
//   contributor_payee_class: null
// }, {
//   tran_id: 2182792,
//   tran_date: '2016-02-29',
//   filer: 'Kate Brown Committee',
//   contributor_payee: 'Patricia Norris',
//   sub_type: 'Cash Contribution',
//   amount: 100,
//   contributor_payee_committee_id: null,
//   filer_id: 931,
//   purp_desc: null,
//   book_type: 'Individual',
//   addr_line1: '2445 glenmorrie drive',
//   filed_date: '2016-03-02',
//   addr_line2: null,
//   city: 'lake oswego',
//   state: 'OR',
//   zip: 97034,
//   purpose_codes: null,
//   direction: 'in',
//   contributor_payee_class: 'grassroots_contributor'
// }, {
//   tran_id: 2182795,
//   tran_date: '2016-02-29',
//   filer: 'Kate Brown Committee',
//   contributor_payee: 'Edward Morey',
//   sub_type: 'Cash Contribution',
//   amount: 250,
//   contributor_payee_committee_id: null,
//   filer_id: 931,
//   purp_desc: null,
//   book_type: 'Individual',
//   addr_line1: '127 Ferry Rd.',
//   filed_date: '2016-03-02',
//   addr_line2: null,
//   city: 'Grants Pass',
//   state: 'OR',
//   zip: 97526,
//   purpose_codes: null,
//   direction: 'in',
//   contributor_payee_class: null
// }, {
//   tran_id: 2182791,
//   tran_date: '2016-02-29',
//   filer: 'Kate Brown Committee',
//   contributor_payee: 'Billie Bell',
//   sub_type: 'Cash Contribution',
//   amount: 125,
//   contributor_payee_committee_id: null,
//   filer_id: 931,
//   purp_desc: null,
//   book_type: 'Individual',
//   addr_line1: '3706 SE 14th Ave',
//   filed_date: '2016-03-02',
//   addr_line2: null,
//   city: 'Portland',
//   state: 'OR',
//   zip: 97202,
//   purpose_codes: null,
//   direction: 'in',
//   contributor_payee_class: 'grassroots_contributor'
// }, {
//   tran_id: 2182804,
//   tran_date: '2016-02-29',
//   filer: 'Kate Brown Committee',
//   contributor_payee: 'Julie Mancini',
//   sub_type: 'Cash Contribution',
//   amount: 1000,
//   contributor_payee_committee_id: null,
//   filer_id: 931,
//   purp_desc: null,
//   book_type: 'Individual',
//   addr_line1: '3345 NW Franklin ct.',
//   filed_date: '2016-03-02',
//   addr_line2: null,
//   city: 'Portland',
//   state: 'OR',
//   zip: 97210,
//   purpose_codes: null,
//   direction: 'in',
//   contributor_payee_class: null
// }, {
//   tran_id: 2182808,
//   tran_date: '2016-02-29',
//   filer: 'Kate Brown Committee',
//   contributor_payee: 'David Wells',
//   sub_type: 'Cash Contribution',
//   amount: 100,
//   contributor_payee_committee_id: null,
//   filer_id: 931,
//   purp_desc: null,
//   book_type: 'Individual',
//   addr_line1: '2397 NW Kings Blvd 161',
//   filed_date: '2016-03-02',
//   addr_line2: null,
//   city: 'Corvallis',
//   state: 'OR',
//   zip: 97330,
//   purpose_codes: null,
//   direction: 'in',
//   contributor_payee_class: 'grassroots_contributor'
// }, {
//   tran_id: 2182834,
//   tran_date: '2016-02-29',
//   filer: 'Kate Brown Committee',
//   contributor_payee: 'Christopher Hardman',
//   sub_type: 'Cash Contribution',
//   amount: 500,
//   contributor_payee_committee_id: null,
//   filer_id: 931,
//   purp_desc: null,
//   book_type: 'Individual',
//   addr_line1: '3003 NE 18th Ave.',
//   filed_date: '2016-03-02',
//   addr_line2: null,
//   city: 'Portland',
//   state: 'OR',
//   zip: 97212,
//   purpose_codes: null,
//   direction: 'in',
//   contributor_payee_class: null
// }, {
//   tran_id: 2182763,
//   tran_date: '2016-02-29',
//   filer: 'Kate Brown Committee',
//   contributor_payee: 'Kasuna Duffey',
//   sub_type: 'Cash Contribution',
//   amount: 100,
//   contributor_payee_committee_id: null,
//   filer_id: 931,
//   purp_desc: null,
//   book_type: 'Individual',
//   addr_line1: '18160 COTTONWOOD RD.',
//   filed_date: '2016-03-02',
//   addr_line2: null,
//   city: 'Sunriver',
//   state: 'OR',
//   zip: 97707,
//   purpose_codes: null,
//   direction: 'in',
//   contributor_payee_class: 'grassroots_contributor'
// }, {
//   tran_id: 2180907,
//   tran_date: '2016-02-29',
//   filer: 'Kate Brown Committee',
//   contributor_payee: 'David Schink',
//   sub_type: 'Cash Contribution',
//   amount: 200,
//   contributor_payee_committee_id: null,
//   filer_id: 931,
//   purp_desc: null,
//   book_type: 'Individual',
//   addr_line1: '6409 Wydown Cir.',
//   filed_date: '2016-03-02',
//   addr_line2: null,
//   city: 'Middleton',
//   state: 'WI',
//   zip: 53562,
//   purpose_codes: null,
//   direction: 'in',
//   contributor_payee_class: 'grassroots_contributor'
// }

// candidate_name: 'Kate Brown',
// committee_name: 'Kate Brown Committee',
// race: '2012 Election Secretary of State statewide',
// total: 3218351.92,
// total_spent: 1752675.74,
// grassroots: 0.112945,
// instate: 0.719707,
// filer_id: 931,
// election: '2012 General Election Secretary of State statewide',
// num_transactions: 4345,
// committee_type: 'CC'