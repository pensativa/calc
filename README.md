### It's a testing calculator, which will compare the prices of different providers. Prices aren't real. And it's created for improving my knowledges.

# Task description:
* The graph is vertical for wide screens and horizontal for narrow ones.
* Two scales of Storage and Transfer in GB, with a step of 1 GB and a range from 0 to 1000 GB.
* The prices do not correspond to the real ones and are indicated for 1 GB.
* The column with the lowest price of the provider's color (red, orange, purple, blue). Other columns are gray.


## Prices for the calculator:
1) backblaze.com:
minimum payment is $7.
Storage price: $0.005.
Transfer price: $0.01.

2) bunny.net:
should be able to switch between HDD and SSD options.
maximum payment is $10.
Storage price:
HDD - $0.01.
SSD - $0.02.
Transfer price: any option - $0.01.

3) scaleway.com:
it should be possible to switch between Multi and Single options.
Storage price:
Multi - 75 GB free, then $0.06.
Single - 75 GB free, then $0.03.
Transfer price: any option - 75 GB free, then $0.02.

4) vultr.com:
minimum payment is $5.
Storage price: $0.01.
Transfer price: $0.01.

## Examples for checking the correctness of the calculation:
a) Storage 50 GB, Transfer 50 GB:
backblaze.com = $7.
bunny.net HDD = 1$, SSD = 1.5$.
scaleway.com Multi = $0, Single = $0.
vultr.com = $5.

b) Storage 100 GB, Transfer 200 GB:
backblaze.com = $7.
bunny.net HDD = $3, SSD = $4.
scaleway.com Multi = $4, scaleway.com Single = $3.25.
vultr.com = $5.

c) Storage 300 GB, Transfer 300 GB:
backblaze.com = $7.
bunny.net HDD = $6, SSD = $9.
scaleway.com Multi = $18, Single = $11.25.
vultr.com = $6.

d) Storage 1000 GB, Transfer 1000 GB:
backblaze.com = $15.
bunny.net HDD = $10, bunny.net SSD = $10.
scaleway.com Multi = $74, Single = $46.25.
vultr.com = $20.