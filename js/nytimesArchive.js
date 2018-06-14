// While testing I reached API limit for this too, so we'll use some data
// from https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=[your Api key]
let nytimesArchive = {
  status: "OK",
  copyright: "Copyright (c) 2018 The New York Times Company. All Rights Reserved.",
  num_results: 15,
  last_modified: "2018-06-07T02:38:01-04:00",
  results: [{
      list_name: "Hardcover Fiction",
      display_name: "Hardcover Fiction",
      bestsellers_date: "2018-06-02",
      published_date: "2018-06-17",
      rank: 1,
      rank_last_week: 1,
      weeks_on_list: 2,
      asterisk: 0,
      dagger: 0,
      amazon_product_url: "https://www.amazon.com/Outsider-Novel-Stephen-King/dp/1501180983?tag=NYTBS-20",
      isbns: [{
          isbn10: "1501180983",
          isbn13: "9781501180989"
        },
        {
          isbn10: "1501181017",
          isbn13: "9781501181016"
        },
        {
          isbn10: "1508252211",
          isbn13: "9781508252214"
        }
      ],
      book_details: [{
        title: "THE OUTSIDER",
        description: "A detective investigates a seemingly wholesome member of the community when an 11-year-old boy’s body is found.",
        contributor: "by Stephen King",
        author: "Stephen King",
        contributor_note: "",
        price: 0,
        age_group: "",
        publisher: "Scribner",
        primary_isbn13: "9781501180989",
        primary_isbn10: "1501180983"
      }],
      reviews: [{
        book_review_link: "https://www.nytimes.com/2018/05/22/books/review/outsider-stephen-king.html",
        first_chapter_link: "",
        sunday_review_link: "",
        article_chapter_link: ""
      }]
    },
    {
      list_name: "Hardcover Fiction",
      display_name: "Hardcover Fiction",
      bestsellers_date: "2018-06-02",
      published_date: "2018-06-17",
      rank: 2,
      rank_last_week: 0,
      weeks_on_list: 1,
      asterisk: 0,
      dagger: 0,
      amazon_product_url: "https://www.amazon.com/Shelter-Place-Nora-Roberts-ebook/dp/B076BGDMK9?tag=NYTBS-20",
      isbns: [{
          isbn10: "1250161592",
          isbn13: "9781250161598"
        },
        {
          isbn10: "1250161614",
          isbn13: "9781250161611"
        },
        {
          isbn10: "1536696854",
          isbn13: "9781536696851"
        },
        {
          isbn10: "154368162X",
          isbn13: "9781543681628"
        },
        {
          isbn10: "1536696870",
          isbn13: "9781536696875"
        }
      ],
      book_details: [{
        title: "SHELTER IN PLACE",
        description: "Survivors of a mass shooting outside a mall in Portland, Me., develop different coping mechanisms and face a new menace.",
        contributor: "by Nora Roberts",
        author: "Nora Roberts",
        contributor_note: "",
        price: 0,
        age_group: "",
        publisher: "St. Martin's",
        primary_isbn13: "9781250161598",
        primary_isbn10: "1250161592"
      }],
      reviews: [{
        book_review_link: "",
        first_chapter_link: "",
        sunday_review_link: "",
        article_chapter_link: ""
      }]
    },
    {
      list_name: "Hardcover Fiction",
      display_name: "Hardcover Fiction",
      bestsellers_date: "2018-06-02",
      published_date: "2018-06-17",
      rank: 3,
      rank_last_week: 0,
      weeks_on_list: 1,
      asterisk: 0,
      dagger: 0,
      amazon_product_url: "https://www.amazon.com/Gray-Ghost-Remi-Fargo-Adventure-ebook/dp/B075HY5MJK?tag=NYTBS-20",
      isbns: [{
          isbn10: "0735218730",
          isbn13: "9780735218734"
        },
        {
          isbn10: "0735218749",
          isbn13: "9780735218741"
        }
      ],
      book_details: [{
        title: "THE GRAY GHOST",
        description: "Sam and Remi Fargo search for a Rolls-Royce prototype that has vanished for a second time.",
        contributor: "by Clive Cussler and Robin Burcell",
        author: "Clive Cussler and Robin Burcell",
        contributor_note: "",
        price: 0,
        age_group: "",
        publisher: "Putnam",
        primary_isbn13: "9780735218734",
        primary_isbn10: "0735218730"
      }],
      reviews: [{
        book_review_link: "",
        first_chapter_link: "",
        sunday_review_link: "",
        article_chapter_link: ""
      }]
    },
    {
      list_name: "Hardcover Fiction",
      display_name: "Hardcover Fiction",
      bestsellers_date: "2018-06-02",
      published_date: "2018-06-17",
      rank: 4,
      rank_last_week: 0,
      weeks_on_list: 1,
      asterisk: 0,
      dagger: 0,
      amazon_product_url: "https://www.amazon.com/Death-Mrs-Westaway-Ruth-Ware/dp/1501156217?tag=NYTBS-20",
      isbns: [{
          isbn10: "None",
          isbn13: "9780143177289"
        },
        {
          isbn10: "1501156217",
          isbn13: "9781501156212"
        },
        {
          isbn10: "1501156225",
          isbn13: "9781501156229"
        }
      ],
      book_details: [{
        title: "THE DEATH OF MRS. WESTAWAY",
        description: "A tarot card reader mistakenly receives an inheritance letter and attends the funeral of the deceased.",
        contributor: "by Ruth Ware",
        author: "Ruth Ware",
        contributor_note: "",
        price: 0,
        age_group: "",
        publisher: "Gallery/Scout",
        primary_isbn13: "9781501156212",
        primary_isbn10: "1501156217"
      }],
      reviews: [{
        book_review_link: "",
        first_chapter_link: "",
        sunday_review_link: "",
        article_chapter_link: ""
      }]
    },
    {
      list_name: "Hardcover Fiction",
      display_name: "Hardcover Fiction",
      bestsellers_date: "2018-06-02",
      published_date: "2018-06-17",
      rank: 5,
      rank_last_week: 0,
      weeks_on_list: 1,
      asterisk: 0,
      dagger: 0,
      amazon_product_url: "https://www.amazon.com/Moon-Back-Novel-Baxter-Family/dp/1451687656?tag=NYTBS-20",
      isbns: [{
          isbn10: "1451687656",
          isbn13: "9781451687651"
        },
        {
          isbn10: "1451687672",
          isbn13: "9781451687675"
        }
      ],
      book_details: [{
        title: "TO THE MOON AND BACK",
        description: "A man whose mother died in the Oklahoma City bombing seeks to reconnect with a woman also affected by the tragedy.",
        contributor: "by Karen Kingsbury",
        author: "Karen Kingsbury",
        contributor_note: "",
        price: 0,
        age_group: "",
        publisher: "Howard",
        primary_isbn13: "9781451687651",
        primary_isbn10: "1451687656"
      }],
      reviews: [{
        book_review_link: "",
        first_chapter_link: "",
        sunday_review_link: "",
        article_chapter_link: ""
      }]
    },
    {
      list_name: "Hardcover Fiction",
      display_name: "Hardcover Fiction",
      bestsellers_date: "2018-06-02",
      published_date: "2018-06-17",
      rank: 6,
      rank_last_week: 3,
      weeks_on_list: 5,
      asterisk: 0,
      dagger: 0,
      amazon_product_url: "https://www.amazon.com/17th-Suspect-Womens-Murder-Club-ebook/dp/B075CSX3KZ?tag=NYTBS-20",
      isbns: [{
          isbn10: "0316274046",
          isbn13: "9780316274043"
        },
        {
          isbn10: "0316412252",
          isbn13: "9780316412254"
        },
        {
          isbn10: "0316412260",
          isbn13: "9780316412261"
        },
        {
          isbn10: "1549168037",
          isbn13: "9781549168031"
        },
        {
          isbn10: "1549171585",
          isbn13: "9781549171581"
        },
        {
          isbn10: "1549171593",
          isbn13: "9781549171598"
        }
      ],
      book_details: [{
        title: "THE 17TH SUSPECT",
        description: "The latest installment in the Women’s Murder Club series.",
        contributor: "by James Patterson and Maxine Paetro",
        author: "James Patterson and Maxine Paetro",
        contributor_note: "",
        price: 0,
        age_group: "",
        publisher: "Little, Brown",
        primary_isbn13: "9780316274043",
        primary_isbn10: "0316274046"
      }],
      reviews: [{
        book_review_link: "",
        first_chapter_link: "",
        sunday_review_link: "",
        article_chapter_link: ""
      }]
    },
    {
      list_name: "Hardcover Fiction",
      display_name: "Hardcover Fiction",
      bestsellers_date: "2018-06-02",
      published_date: "2018-06-17",
      rank: 7,
      rank_last_week: 4,
      weeks_on_list: 7,
      asterisk: 0,
      dagger: 0,
      amazon_product_url: "https://www.amazon.com/Fallen-Memory-Man-David-Baldacci-ebook/dp/B074M62RVY?tag=NYTBS-20",
      isbns: [{
          isbn10: "1538761394",
          isbn13: "9781538761397"
        },
        {
          isbn10: "1538763087",
          isbn13: "9781538763087"
        },
        {
          isbn10: "1538761378",
          isbn13: "9781538761373"
        },
        {
          isbn10: "1538713667",
          isbn13: "9781538713662"
        },
        {
          isbn10: "1478999233",
          isbn13: "9781478999232"
        },
        {
          isbn10: "1478999225",
          isbn13: "9781478999225"
        },
        {
          isbn10: "1549168002",
          isbn13: "9781549168000"
        },
        {
          isbn10: "1549171550",
          isbn13: "9781549171550"
        },
        {
          isbn10: "1549171569",
          isbn13: "9781549171567"
        },
        {
          isbn10: "1549168010",
          isbn13: "9781549168017"
        }
      ],
      book_details: [{
        title: "THE FALLEN",
        description: "Amos Decker puts his talents toward solving a string of murders.",
        contributor: "by David Baldacci",
        author: "David Baldacci",
        contributor_note: "",
        price: 0,
        age_group: "",
        publisher: "Grand Central",
        primary_isbn13: "9781538761397",
        primary_isbn10: "1538761394"
      }],
      reviews: [{
        book_review_link: "",
        first_chapter_link: "",
        sunday_review_link: "",
        article_chapter_link: ""
      }]
    },
    {
      list_name: "Hardcover Fiction",
      display_name: "Hardcover Fiction",
      bestsellers_date: "2018-06-02",
      published_date: "2018-06-17",
      rank: 8,
      rank_last_week: 5,
      weeks_on_list: 3,
      asterisk: 0,
      dagger: 0,
      amazon_product_url: "https://www.amazon.com/Invitation-Only-Dorothea-Benton-Frank-ebook/dp/B071S5VRQV?tag=NYTBS-20",
      isbns: [{
          isbn10: "0062390821",
          isbn13: "9780062390820"
        },
        {
          isbn10: "006239083X",
          isbn13: "9780062390837"
        }
      ],
      book_details: [{
        title: "BY INVITATION ONLY",
        description: "The daughter of a Chicago power broker and the son of a Southern peach farmer decide to wed.",
        contributor: "by Dorothea Benton Frank",
        author: "Dorothea Benton Frank",
        contributor_note: "",
        price: 0,
        age_group: "",
        publisher: "Morrow",
        primary_isbn13: "9780062390820",
        primary_isbn10: "0062390821"
      }],
      reviews: [{
        book_review_link: "",
        first_chapter_link: "",
        sunday_review_link: "",
        article_chapter_link: ""
      }]
    },
    {
      list_name: "Hardcover Fiction",
      display_name: "Hardcover Fiction",
      bestsellers_date: "2018-06-02",
      published_date: "2018-06-17",
      rank: 9,
      rank_last_week: 2,
      weeks_on_list: 3,
      asterisk: 0,
      dagger: 0,
      amazon_product_url: "https://www.amazon.com/Cast-Novel-Danielle-Steel-ebook/dp/B074YLL8GR?tag=NYTBS-20",
      isbns: [{
          isbn10: "1101884037",
          isbn13: "9781101884034"
        },
        {
          isbn10: "1101884045",
          isbn13: "9781101884041"
        }
      ],
      book_details: [{
        title: "THE CAST",
        description: "A magazine columnist meets an array of Hollywood professionals when a producer turns a story about her grandmother into a TV series.",
        contributor: "by Danielle Steel",
        author: "Danielle Steel",
        contributor_note: "",
        price: 0,
        age_group: "",
        publisher: "Delacorte",
        primary_isbn13: "9781101884034",
        primary_isbn10: "1101884037"
      }],
      reviews: [{
        book_review_link: "",
        first_chapter_link: "",
        sunday_review_link: "",
        article_chapter_link: ""
      }]
    },
    {
      list_name: "Hardcover Fiction",
      display_name: "Hardcover Fiction",
      bestsellers_date: "2018-06-02",
      published_date: "2018-06-17",
      rank: 10,
      rank_last_week: 7,
      weeks_on_list: 37,
      asterisk: 0,
      dagger: 0,
      amazon_product_url: "https://www.amazon.com/Before-We-Were-Yours-Novel/dp/0425284689?tag=NYTBS-20",
      isbns: [{
          isbn10: "0425284689",
          isbn13: "9780425284681"
        },
        {
          isbn10: "0425284697",
          isbn13: "9780425284698"
        },
        {
          isbn10: "1524797308",
          isbn13: "9781524797300"
        },
        {
          isbn10: "1432839128",
          isbn13: "9781432839123"
        }
      ],
      book_details: [{
        title: "BEFORE WE WERE YOURS",
        description: "A South Carolina lawyer learns about the questionable practices of a Tennessee orphanage.",
        contributor: "by Lisa Wingate",
        author: "Lisa Wingate",
        contributor_note: "",
        price: 0,
        age_group: "",
        publisher: "Ballantine",
        primary_isbn13: "9780425284681",
        primary_isbn10: "0425284689"
      }],
      reviews: [{
        book_review_link: "",
        first_chapter_link: "",
        sunday_review_link: "",
        article_chapter_link: ""
      }]
    },
    {
      list_name: "Hardcover Fiction",
      display_name: "Hardcover Fiction",
      bestsellers_date: "2018-06-02",
      published_date: "2018-06-17",
      rank: 11,
      rank_last_week: 11,
      weeks_on_list: 37,
      asterisk: 1,
      dagger: 0,
      amazon_product_url: "https://www.amazon.com/Little-Fires-Everywhere-Celeste-Ng-ebook/dp/B01N4VW75U?tag=NYTBS-20",
      isbns: [{
          isbn10: "0735224293",
          isbn13: "9780735224292"
        },
        {
          isbn10: "0735224307",
          isbn13: "9780735224308"
        },
        {
          isbn10: "0525498079",
          isbn13: "9780525498070"
        },
        {
          isbn10: "0525498060",
          isbn13: "9780525498063"
        }
      ],
      book_details: [{
        title: "LITTLE FIRES EVERYWHERE",
        description: "An artist upends a quiet town outside Cleveland.",
        contributor: "by Celeste Ng",
        author: "Celeste Ng",
        contributor_note: "",
        price: 0,
        age_group: "",
        publisher: "Penguin Press",
        primary_isbn13: "9780735224292",
        primary_isbn10: "0735224293"
      }],
      reviews: [{
        book_review_link: "https://www.nytimes.com/2017/09/25/books/review/little-fires-everywhere-celeste-ng.html",
        first_chapter_link: "",
        sunday_review_link: "",
        article_chapter_link: ""
      }]
    },
    {
      list_name: "Hardcover Fiction",
      display_name: "Hardcover Fiction",
      bestsellers_date: "2018-06-02",
      published_date: "2018-06-17",
      rank: 12,
      rank_last_week: 9,
      weeks_on_list: 4,
      asterisk: 0,
      dagger: 0,
      amazon_product_url: "https://www.amazon.com/High-Tide-Club-Novel-ebook/dp/B075QKH6BH?tag=NYTBS-20",
      isbns: [{
          isbn10: "1250126061",
          isbn13: "9781250126061"
        },
        {
          isbn10: "1250126096",
          isbn13: "9781250126092"
        }
      ],
      book_details: [{
        title: "THE HIGH TIDE CLUB",
        description: "An eccentric millionaire enlists the attorney Brooke Trappnell to fix old wrongs.",
        contributor: "by Mary Kay Andrews",
        author: "Mary Kay Andrews",
        contributor_note: "",
        price: 0,
        age_group: "",
        publisher: "St. Martin's",
        primary_isbn13: "9781250126061",
        primary_isbn10: "1250126061"
      }],
      reviews: [{
        book_review_link: "",
        first_chapter_link: "",
        sunday_review_link: "",
        article_chapter_link: ""
      }]
    },
    {
      list_name: "Hardcover Fiction",
      display_name: "Hardcover Fiction",
      bestsellers_date: "2018-06-02",
      published_date: "2018-06-17",
      rank: 13,
      rank_last_week: 13,
      weeks_on_list: 22,
      asterisk: 0,
      dagger: 0,
      amazon_product_url: "https://www.amazon.com/Woman-Window-Novel-J-Finn/dp/0062678418?tag=NYTBS-20",
      isbns: [{
          isbn10: "0062678418",
          isbn13: "9780062678416"
        },
        {
          isbn10: "0062678442",
          isbn13: "9780062678447"
        },
        {
          isbn10: "0062678434",
          isbn13: "9780062678430"
        },
        {
          isbn10: "0062801953",
          isbn13: "9780062801951"
        }
      ],
      book_details: [{
        title: "THE WOMAN IN THE WINDOW",
        description: "A recluse who drinks heavily and takes prescription drugs may have witnessed a crime across from her Harlem townhouse.",
        contributor: "by A.J. Finn",
        author: "AJ Finn",
        contributor_note: "",
        price: 0,
        age_group: "",
        publisher: "Morrow",
        primary_isbn13: "9780062678416",
        primary_isbn10: "0062678418"
      }],
      reviews: [{
        book_review_link: "",
        first_chapter_link: "",
        sunday_review_link: "",
        article_chapter_link: ""
      }]
    },
    {
      list_name: "Hardcover Fiction",
      display_name: "Hardcover Fiction",
      bestsellers_date: "2018-06-02",
      published_date: "2018-06-17",
      rank: 14,
      rank_last_week: 12,
      weeks_on_list: 17,
      asterisk: 0,
      dagger: 0,
      amazon_product_url: "https://www.amazon.com/Great-Alone-Novel-Kristin-Hannah-ebook/dp/B06Y5WRS2C?tag=NYTBS-20",
      isbns: [{
          isbn10: "0312577230",
          isbn13: "9780312577230"
        },
        {
          isbn10: "125016561X",
          isbn13: "9781250165619"
        },
        {
          isbn10: "1683247000",
          isbn13: "9781683247005"
        },
        {
          isbn10: "1427212686",
          isbn13: "9781427212689"
        },
        {
          isbn10: "1718849532",
          isbn13: "9781718849532"
        }
      ],
      book_details: [{
        title: "THE GREAT ALONE",
        description: "A former prisoner of war moves his family to Alaska.",
        contributor: "by Kristin Hannah",
        author: "Kristin Hannah",
        contributor_note: "",
        price: 0,
        age_group: "",
        publisher: "St. Martin's",
        primary_isbn13: "9780312577230",
        primary_isbn10: "0312577230"
      }],
      reviews: [{
        book_review_link: "",
        first_chapter_link: "",
        sunday_review_link: "",
        article_chapter_link: ""
      }]
    },
    {
      list_name: "Hardcover Fiction",
      display_name: "Hardcover Fiction",
      bestsellers_date: "2018-06-02",
      published_date: "2018-06-17",
      rank: 15,
      rank_last_week: 8,
      weeks_on_list: 4,
      asterisk: 0,
      dagger: 0,
      amazon_product_url: "https://www.amazon.com/Warlight-novel-Michael-Ondaatje/dp/0525521194?tag=NYTBS-20",
      isbns: [{
          isbn10: "0525521194",
          isbn13: "9780525521198"
        },
        {
          isbn10: "0525521208",
          isbn13: "9780525521204"
        },
        {
          isbn10: "0525633006",
          isbn13: "9780525633006"
        }
      ],
      book_details: [{
        title: "WARLIGHT",
        description: "In Britain after World War II, a pair of teenage siblings are taken under the tutelage of a mysterious man.",
        contributor: "by Michael Ondaatje",
        author: "Michael Ondaatje",
        contributor_note: "",
        price: 0,
        age_group: "",
        publisher: "Knopf",
        primary_isbn13: "9780525521198",
        primary_isbn10: "0525521194"
      }],
      reviews: [{
        book_review_link: "https://www.nytimes.com/2018/06/07/books/review/michael-ondaatje-warlight.html",
        first_chapter_link: "",
        sunday_review_link: "",
        article_chapter_link: ""
      }]
    }
  ]
}